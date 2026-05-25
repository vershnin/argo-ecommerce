package com.argo.ecommerce.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.annotation.Order;
// import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
// import java.util.Map;
// import java.util.concurrent.ConcurrentHashMap;

// @Component
@Order(1)
public class RateLimitFilter extends OncePerRequestFilter {

    // TODO: Implement rate limiting using bucket4j when dependency is available
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        // For now, just pass through all requests
        filterChain.doFilter(request, response);
    }
}
