package com.argo.ecommerce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve uploaded product images
        registry.addResourceHandler("/uploads/products/**")
                .addResourceLocations("file:uploads/products/")
                .setCachePeriod(3600); // Cache for 1 hour
    }
}