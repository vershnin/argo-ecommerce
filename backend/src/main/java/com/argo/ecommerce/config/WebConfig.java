package com.argo.ecommerce.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.TimeUnit;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${app.storage.local.path}")
    private String localStoragePath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path productDir = Paths.get(localStoragePath, "products")
                .toAbsolutePath().normalize();

        registry.addResourceHandler("/uploads/products/**")
                .addResourceLocations("file:" + productDir.toString() + "/")
                .setCacheControl(CacheControl.maxAge(31536000, TimeUnit.SECONDS).cachePublic().immutable());
    }
}