package com.argo.ecommerce.service.impl;

import com.argo.ecommerce.entity.Order;
import com.argo.ecommerce.entity.OrderItem;
import com.argo.ecommerce.entity.OrderStatus;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class EmailNotificationService {

    private static final Logger log = LoggerFactory.getLogger(EmailNotificationService.class);

    private final JavaMailSender mailSender;

    @Value("${app.notifications.enabled:false}")
    private boolean notificationsEnabled;

    @Value("${app.notifications.from:no-reply@argo.com}")
    private String fromAddress;

    public void sendOrderCreatedNotification(Order order) {
        if (!notificationsEnabled) {
            log.debug("Email notifications are disabled. Skipping order confirmation email for {}", order.getOrderNumber());
            return;
        }
        sendOrderNotification(order, "Order Confirmation - " + order.getOrderNumber(), buildOrderConfirmationBody(order));
    }

    public void sendOrderStatusChangedNotification(Order order, OrderStatus oldStatus) {
        if (!notificationsEnabled) {
            log.debug("Email notifications are disabled. Skipping order status email for {}", order.getOrderNumber());
            return;
        }
        if (oldStatus == order.getStatus()) {
            log.debug("Order {} status unchanged. Skipping status update email.", order.getOrderNumber());
            return;
        }
        sendOrderNotification(order, "Order Status Updated - " + order.getOrderNumber(), buildOrderStatusUpdateBody(order, oldStatus));
    }

    private void sendOrderNotification(Order order, String subject, String htmlBody) {
        String to = order.getShippingEmail();
        if (!StringUtils.hasText(to)) {
            log.warn("Order {} does not have a shipping email; skipping email notification.", order.getOrderNumber());
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
            helper.setFrom(fromAddress);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            mailSender.send(message);
            log.info("Sent email notification to {} for order {}", to, order.getOrderNumber());
        } catch (MessagingException exception) {
            log.error("Failed to send email notification for order {} to {}", order.getOrderNumber(), to, exception);
        }
    }

    private String buildOrderConfirmationBody(Order order) {
        StringBuilder itemsHtml = new StringBuilder();
        for (OrderItem item : order.getItems()) {
            itemsHtml.append("<li>")
                    .append(item.getQuantity())
                    .append(" × ")
                    .append(item.getProductName())
                    .append(" - KSH ")
                    .append(item.getUnitPrice())
                    .append(" (subtotal: KSH ")
                    .append(item.getSubtotal())
                    .append(")</li>");
        }

        return """
                <html>
                <body>
                    <p>Hi %s,</p>
                    <p>Thanks for your order! Your order <strong>%s</strong> has been placed successfully.</p>
                    <p><strong>Order total:</strong> KSH %s</p>
                    <p><strong>Delivery method:</strong> %s</p>
                    <p><strong>Shipping address:</strong><br/>%s<br/>%s, %s</p>
                    <p><strong>Order items:</strong></p>
                    <ul>%s</ul>
                    <p>We will notify you again when your order status changes.</p>
                    <p>Thank you for shopping with Argo Electronics.</p>
                </body>
                </html>
                """.formatted(
                StringUtils.hasText(order.getShippingFullName()) ? order.getShippingFullName() : "Customer",
                order.getOrderNumber(),
                order.getTotalAmount(),
                order.getDeliveryMethod() != null ? order.getDeliveryMethod() : "Standard",
                StringUtils.hasText(order.getShippingStreet()) ? order.getShippingStreet() : "",
                StringUtils.hasText(order.getShippingCity()) ? order.getShippingCity() : "",
                StringUtils.hasText(order.getShippingRegion()) ? order.getShippingRegion() : "",
                itemsHtml.toString());
    }

    private String buildOrderStatusUpdateBody(Order order, OrderStatus oldStatus) {
        return """
                <html>
                <body>
                    <p>Hi %s,</p>
                    <p>Your order <strong>%s</strong> status has changed.</p>
                    <p><strong>Previous status:</strong> %s<br/>
                    <strong>Current status:</strong> %s</p>
                    <p>Order total: KSH %s</p>
                    <p>We will continue to keep you updated until delivery.</p>
                    <p>Thank you for shopping with Argo Electronics.</p>
                </body>
                </html>
                """.formatted(
                StringUtils.hasText(order.getShippingFullName()) ? order.getShippingFullName() : "Customer",
                order.getOrderNumber(),
                oldStatus.name(),
                order.getStatus().name(),
                order.getTotalAmount());
    }
}
