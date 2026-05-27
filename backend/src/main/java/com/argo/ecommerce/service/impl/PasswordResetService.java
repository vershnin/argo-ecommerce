package com.argo.ecommerce.service.impl;

import com.argo.ecommerce.dto.request.ForgotPasswordRequest;
import com.argo.ecommerce.dto.request.ResetPasswordRequest;
import com.argo.ecommerce.entity.PasswordResetToken;
import com.argo.ecommerce.entity.User;
import com.argo.ecommerce.exception.BadRequestException;
import com.argo.ecommerce.repository.PasswordResetTokenRepository;
import com.argo.ecommerce.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordResetService {

    private static final Logger log = LoggerFactory.getLogger(PasswordResetService.class);

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final ObjectProvider<JavaMailSender> mailSenderProvider;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.notifications.enabled:false}")
    private boolean notificationsEnabled;

    @Value("${app.notifications.from:no-reply@argo.com}")
    private String fromAddress;

    @Transactional
    public void sendResetLink(ForgotPasswordRequest request) {
        String email = request.getEmail().trim();
        userRepository.findByEmail(email).ifPresent(user -> {
            tokenRepository.deleteByUserId(user.getId());
            PasswordResetToken token = new PasswordResetToken();
            token.setUser(user);
            token.setToken(UUID.randomUUID().toString());
            token.setExpiresAt(LocalDateTime.now().plusHours(1));
            tokenRepository.save(token);
            sendEmail(user, token);
        });
    }

    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        PasswordResetToken token = tokenRepository.findByToken(request.getToken())
                .orElseThrow(() -> new BadRequestException("Invalid or expired password reset token"));

        if (token.isUsed() || token.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Invalid or expired password reset token");
        }

        User user = token.getUser();
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        token.setUsed(true);
        userRepository.save(user);
        tokenRepository.save(token);
    }

    private void sendEmail(User user, PasswordResetToken token) {
        if (!notificationsEnabled) {
            log.debug("Password reset email disabled. Token created for {}: {}", user.getEmail(), token.getToken());
            return;
        }

        JavaMailSender mailSender = mailSenderProvider.getIfAvailable();
        if (mailSender == null) {
            log.warn("JavaMailSender is not available, cannot send password reset email to {}", user.getEmail());
            return;
        }

        String resetLink = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/reset-password")
                .queryParam("token", token.getToken())
                .toUriString();

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
            helper.setFrom(fromAddress);
            helper.setTo(user.getEmail());
            helper.setSubject("Reset your Argo password");
            helper.setText(buildEmailBody(user.getFullName(), resetLink), true);
            mailSender.send(message);
            log.info("Password reset email sent to {}", user.getEmail());
        } catch (MessagingException exception) {
            log.error("Failed to send password reset email to {}", user.getEmail(), exception);
        }
    }

    private String buildEmailBody(String fullName, String resetLink) {
        return "<html><body>"
                + "<p>Hi " + (StringUtils.hasText(fullName) ? fullName : "Customer") + ",</p>"
                + "<p>We received a request to reset your password. Click the link below to continue:</p>"
                + "<p><a href=\"" + resetLink + "\">Reset Password</a></p>"
                + "<p>If you did not request this, you can ignore this message.</p>"
                + "</body></html>";
    }
}
