package com.argo.ecommerce.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

// @Component
@Component
@Order(1)
public class RateLimitFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(RateLimitFilter.class);

    // Configuration
    private static final int MAX_AUTH_ATTEMPTS = 5;
    private static final Duration WINDOW_DURATION = Duration.ofMinutes(15);
    private static final int MAX_CACHE_ENTRIES = 10000;  // Bounded cache to prevent OOM
    private static final String BEARER_PREFIX = "Bearer ";

    // Bounded cache: maps IP/identifier to (attempts, window_start)
    private final Map<String, RateLimitEntry> rateLimitCache = Collections.synchronizedMap(
            new LinkedHashMap<String, RateLimitEntry>(16, 0.75f, true) {
                @Override
                protected boolean removeEldestEntry(Map.Entry<String, RateLimitEntry> eldest) {
                    return size() > MAX_CACHE_ENTRIES;
                }
            }
    );

    private static class RateLimitEntry {
        int attempts = 0;
        Instant windowStart = Instant.now();
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String path = request.getRequestURI();

        // Only rate limit authentication endpoints
        if (!path.startsWith("/api/auth/")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Use Bearer token or IP as identifier
        String identifier = extractIdentifier(request);
        if (identifier == null) {
            identifier = request.getRemoteAddr();
        }
        if (identifier == null) {
            identifier = "unknown";
        }

        // Check rate limit
        if (isRateLimited(identifier)) {
            log.warn("Rate limit exceeded for identifier: {}", identifier);
            response.setStatus(429);  // TOO_MANY_REQUESTS
            response.setContentType("application/json");
            response.getWriter().write("{\"message\":\"Too many requests. Please try again later.\"}");
            return;
        }

        filterChain.doFilter(request, response);
    }

    private synchronized boolean isRateLimited(String identifier) {
        RateLimitEntry entry = rateLimitCache.getOrDefault(identifier, new RateLimitEntry());
        Instant now = Instant.now();

        // Reset if window expired
        if (now.isAfter(entry.windowStart.plus(WINDOW_DURATION))) {
            entry.attempts = 0;
            entry.windowStart = now;
        }

        entry.attempts++;
        rateLimitCache.put(identifier, entry);

        return entry.attempts > MAX_AUTH_ATTEMPTS;
    }

    /**
     * Extract user identifier from JWT token (if present) for user-level rate limiting.
     * Falls back to IP-based limiting if token not available.
     */
    private String extractIdentifier(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith(BEARER_PREFIX)) {
            // User-level rate limiting: use token hash
            return "token:" + authHeader.substring(BEARER_PREFIX.length()).hashCode();
        }
        return null;  // Fall back to IP-based limiting
    }
}
