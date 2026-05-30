package com.argo.ecommerce.service.impl;

import com.argo.ecommerce.config.AppConfig;
import com.argo.ecommerce.exception.BadRequestException;
import com.argo.ecommerce.service.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@Profile("!s3")
@RequiredArgsConstructor
public class LocalStorageService implements StorageService {

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    private static final byte[] JPEG_MAGIC = new byte[] {(byte) 0xFF, (byte) 0xD8, (byte) 0xFF};
    private static final byte[] PNG_MAGIC = new byte[] {(byte) 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A};
    private static final byte[] RIFF_MAGIC = new byte[] {0x52, 0x49, 0x46, 0x46};
    private static final byte[] WEBP_MAGIC = new byte[] {0x57, 0x45, 0x42, 0x50};

    private final AppConfig appConfig;

    @Override
    public String store(MultipartFile file) throws IOException {
        validateFile(file);

        String extension = determineExtension(file);
        Path storageDir = getStorageDirectory();
        Files.createDirectories(storageDir);

        String filename = UUID.randomUUID().toString() + "." + extension;
        Path target = storageDir.resolve(filename);

        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, target);
        }

        return getBaseUrl() + "/uploads/products/" + filename;
    }

    @Override
    public void delete(String fileUrl) {
        try {
            Path target = resolvePath(fileUrl);
            if (Files.exists(target)) {
                Files.delete(target);
            }
        } catch (IOException | IllegalArgumentException ignored) {
            // Ignore failures when deleting local fallback assets or malformed URLs.
        }
    }

    @Override
    public String getBaseUrl() {
        return appConfig.getBaseUrl();
    }

    private Path getStorageDirectory() {
        return Paths.get(appConfig.getStorage().getLocal().getPath(), "products")
                .toAbsolutePath().normalize();
    }

    private void validateFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("File is empty");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new BadRequestException("File size exceeds 5MB limit");
        }

        try (InputStream inputStream = file.getInputStream()) {
            byte[] header = new byte[12];
            int read = inputStream.read(header);
            if (!isJpeg(header, read) && !isPng(header, read) && !isWebp(header, read)) {
                throw new BadRequestException("Only JPEG, PNG, and WebP images are allowed");
            }
        }
    }

    private String determineExtension(MultipartFile file) throws IOException {
        try (InputStream inputStream = file.getInputStream()) {
            byte[] header = new byte[12];
            int read = inputStream.read(header);
            if (isJpeg(header, read)) {
                return "jpg";
            }
            if (isPng(header, read)) {
                return "png";
            }
            if (isWebp(header, read)) {
                return "webp";
            }
        }
        throw new BadRequestException("Unsupported image type");
    }

    private Path resolvePath(String fileUrl) {
        String normalizedUrl = fileUrl == null ? "" : fileUrl.trim();
        if (normalizedUrl.startsWith(getBaseUrl())) {
            normalizedUrl = normalizedUrl.substring(getBaseUrl().length());
        }
        if (normalizedUrl.startsWith("/")) {
            normalizedUrl = normalizedUrl.substring(1);
        }
        if (!normalizedUrl.startsWith("uploads/products/")) {
            throw new IllegalArgumentException("File URL is not a local upload");
        }
        String filename = normalizedUrl.substring("uploads/products/".length());
        Path target = getStorageDirectory().resolve(filename).normalize();
        if (!target.startsWith(getStorageDirectory())) {
            throw new IllegalArgumentException("Invalid file URL");
        }
        return target;
    }

    private boolean isJpeg(byte[] header, int length) {
        return length >= JPEG_MAGIC.length && matchesPrefix(header, JPEG_MAGIC);
    }

    private boolean isPng(byte[] header, int length) {
        return length >= PNG_MAGIC.length && matchesPrefix(header, PNG_MAGIC);
    }

    private boolean isWebp(byte[] header, int length) {
        return length >= 12 && matchesPrefix(header, RIFF_MAGIC) && matchesPrefix(header, WEBP_MAGIC, 8);
    }

    private boolean matchesPrefix(byte[] data, byte[] prefix) {
        return matchesPrefix(data, prefix, 0);
    }

    private boolean matchesPrefix(byte[] data, byte[] prefix, int offset) {
        if (data == null || data.length < offset + prefix.length) {
            return false;
        }
        for (int i = 0; i < prefix.length; i++) {
            if (data[offset + i] != prefix[i]) {
                return false;
            }
        }
        return true;
    }
}
