package com.argo.ecommerce.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "app")
@Data
public class AppConfig {

    private String baseUrl = "http://localhost:8080";
    private String corsAllowedOrigins;
    private Storage storage = new Storage();
    private Jwt jwt = new Jwt();
    private Notifications notifications = new Notifications();

    @Data
    public static class Storage {
        private Local local = new Local();
        private S3 s3 = new S3();
    }

    @Data
    public static class Local {
        private String path = System.getProperty("user.home") + "/argo-uploads";
    }

    @Data
    public static class S3 {
        private String bucket;
        private String region = "us-east-1";
        private String baseUrl;
    }

    @Data
    public static class Jwt {
        private String secret;
        private long expirationMs;
    }

    @Data
    public static class Notifications {
        private boolean enabled;
        private String from;
    }
}
