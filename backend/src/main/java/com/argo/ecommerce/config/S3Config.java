package com.argo.ecommerce.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
@Profile("s3")
public class S3Config {

    private final AppConfig appConfig;

    public S3Config(AppConfig appConfig) {
        this.appConfig = appConfig;
    }

    @Bean
    public S3Client s3Client() {
        String region = appConfig.getStorage().getS3().getRegion();
        return S3Client.builder()
                .region(Region.of(region))
                .build();
    }
}
