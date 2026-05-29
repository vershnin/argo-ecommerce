package com.argo.ecommerce.controller;

import com.argo.ecommerce.dto.response.ApiResponse;
import com.argo.ecommerce.exception.BadRequestException;
import com.argo.ecommerce.service.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class FileUploadController {

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    private static final byte[] JPEG_MAGIC = new byte[] {(byte) 0xFF, (byte) 0xD8, (byte) 0xFF};
    private static final byte[] PNG_MAGIC = new byte[] {(byte) 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A};
    private static final byte[] RIFF_MAGIC = new byte[] {0x52, 0x49, 0x46, 0x46};
    private static final byte[] WEBP_MAGIC = new byte[] {0x57, 0x45, 0x42, 0x50};

    private final StorageService storageService;

    @PostMapping(value = "/upload/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<String>> uploadProductImage(
            @RequestParam("file") MultipartFile file) {

        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, "File is empty", null));
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, "File size exceeds 5MB limit", null));
        }

        try {
            validateImageFile(file);
            String imageUrl = storageService.store(file);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<>(true, "Image uploaded successfully", imageUrl));
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, "Failed to upload image: " + e.getMessage(), null));
        }
    }

    private void validateImageFile(MultipartFile file) throws IOException {
        try (InputStream inputStream = file.getInputStream()) {
            byte[] header = new byte[12];
            int read = inputStream.read(header);
            if (read < 8) {
                throw new BadRequestException("Only JPEG, PNG, and WebP images are allowed");
            }

            if (isJpeg(header, read) || isPng(header, read) || isWebp(header, read)) {
                return;
            }

            throw new BadRequestException("Only JPEG, PNG, and WebP images are allowed");
        }
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
        if (data.length < offset + prefix.length) {
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
