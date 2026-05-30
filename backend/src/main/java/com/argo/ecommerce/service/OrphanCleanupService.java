package com.argo.ecommerce.service;

import com.argo.ecommerce.config.AppConfig;
import com.argo.ecommerce.entity.Product;
import com.argo.ecommerce.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class OrphanCleanupService {

    private static final Logger log = LoggerFactory.getLogger(OrphanCleanupService.class);
    private final ProductRepository productRepository;
    private final AppConfig appConfig;

    public OrphanCleanupService(ProductRepository productRepository, AppConfig appConfig) {
        this.productRepository = productRepository;
        this.appConfig = appConfig;
    }

    @Scheduled(cron = "0 0 3 * * *")
    @Transactional(readOnly = true)
    public void cleanupOrphanedProductImages() {
        Path uploadsDir = Paths.get(appConfig.getStorage().getLocal().getPath(), "products").toAbsolutePath().normalize();
        if (!Files.exists(uploadsDir)) {
            log.info("Orphan cleanup skipped: upload directory does not exist: {}", uploadsDir);
            return;
        }

        Set<String> referencedPaths = productRepository.findAll().stream()
                .flatMap(this::productImageUrls)
                .filter(path -> path.startsWith("/uploads/products/"))
                .collect(Collectors.toSet());

        int deletedCount = 0;
        try (Stream<Path> paths = Files.walk(uploadsDir)) {
            for (Path path : paths.filter(Files::isRegularFile).collect(Collectors.toList())) {
                String normalizedFilePath = "/uploads/products/" + uploadsDir.relativize(path).toString().replace('\\', '/');
                if (!referencedPaths.contains(normalizedFilePath)) {
                    try {
                        Files.delete(path);
                        deletedCount++;
                        log.info("Deleted orphaned upload file: {}", path);
                    } catch (IOException e) {
                        log.warn("Unable to delete orphaned file {}: {}", path, e.getMessage());
                    }
                }
            }
        } catch (IOException e) {
            log.error("Failed to scan upload directory for orphan cleanup", e);
        }

        log.info("Orphan cleanup complete. {} orphaned files removed.", deletedCount);
    }

    private Stream<String> productImageUrls(Product product) {
        return Stream.concat(
                normalizeProductUrl(product.getImageUrl()),
                product.getAdditionalImageUrls().stream().flatMap(this::normalizeProductUrls)
        );
    }

    private Stream<String> normalizeProductUrl(String url) {
        String normalized = normalizeUrl(url);
        return normalized == null ? Stream.empty() : Stream.of(normalized);
    }

    private Stream<String> normalizeProductUrls(String url) {
        String normalized = normalizeUrl(url);
        return normalized == null ? Stream.empty() : Stream.of(normalized);
    }

    private String normalizeUrl(String url) {
        if (url == null || url.isBlank()) {
            return null;
        }
        String trimmed = url.trim();
        if (trimmed.startsWith(appConfig.getBaseUrl())) {
            trimmed = trimmed.substring(appConfig.getBaseUrl().length());
        }
        if (trimmed.startsWith("uploads/")) {
            trimmed = "/" + trimmed;
        }
        if (!trimmed.startsWith("/uploads/products/")) {
            return null;
        }
        return trimmed;
    }
}
