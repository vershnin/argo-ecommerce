package com.argo.ecommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ArgoEcommerceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ArgoEcommerceApplication.class, args);
    }
}
