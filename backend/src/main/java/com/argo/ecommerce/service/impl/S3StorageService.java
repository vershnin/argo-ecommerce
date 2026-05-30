package com.argo.ecommerce.service.impl;

import com.argo.ecommerce.config.AppConfig;
import com.argo.ecommerce.service.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
@Profile("s3")
@RequiredArgsConstructor
public class S3StorageService implements StorageService {

    private final AppConfig appConfig;
    private final S3Client s3Client;

    @Override
    public String store(MultipartFile file) throws IOException {
        String bucket = appConfig.getStorage().getS3().getBucket();
        String baseUrl = appConfig.getStorage().getS3().getBaseUrl();
        if (bucket == null || bucket.isBlank() || baseUrl == null || baseUrl.isBlank()) {
            throw new IllegalStateException("S3 storage is not configured properly");
        }

        String filename = UUID.randomUUID().toString() + determineExtension(file);
        String key = "products/" + filename;

        try (InputStream inputStream = file.getInputStream()) {
            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket(bucket)
                    .key(key)
                    .contentType(file.getContentType())
                    .contentLength(file.getSize())
                    .build();

            s3Client.putObject(request, RequestBody.fromInputStream(inputStream, file.getSize()));
        }

        return baseUrl.endsWith("/") ? baseUrl + key : baseUrl + "/" + key;
    }

    @Override
    public void delete(String fileUrl) {
        String bucket = appConfig.getStorage().getS3().getBucket();
        if (bucket == null || bucket.isBlank()) {
            return;
        }

        String baseUrl = appConfig.getStorage().getS3().getBaseUrl();
        if (fileUrl == null || baseUrl == null || !fileUrl.startsWith(baseUrl)) {
            return;
        }

        String key = fileUrl.substring(baseUrl.length());
        if (key.startsWith("/")) {
            key = key.substring(1);
        }

        DeleteObjectRequest request = DeleteObjectRequest.builder()
                .bucket(bucket)
                .key(key)
                .build();

        s3Client.deleteObject(request);
    }

    @Override
    public String getBaseUrl() {
        return appConfig.getStorage().getS3().getBaseUrl();
    }

    private String determineExtension(MultipartFile file) throws IOException {
        String contentType = file.getContentType();
        if (contentType != null) {
            if (contentType.equals("image/jpeg")) {
                return ".jpg";
            }
            if (contentType.equals("image/png")) {
                return ".png";
            }
            if (contentType.equals("image/webp")) {
                return ".webp";
            }
        }
        throw new IllegalArgumentException("Unsupported image type for S3 upload");
    }
}
