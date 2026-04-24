package com.argo.ecommerce.service.impl;

import com.argo.ecommerce.dto.response.ProductResponse;
import com.argo.ecommerce.entity.Product;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Component
public class ProductMapper {

    public ProductResponse toResponse(Product p) {
        return ProductResponse.builder()
                .id(p.getId())
                .name(p.getName())
                .slug(p.getSlug())
                .description(p.getDescription())
                .shortDescription(p.getShortDescription())
                .brand(p.getBrand())
                .imageUrl(p.getImageUrl())
                .additionalImages(parseImages(p.getAdditionalImages()))
                .price(p.getPrice())
                .discountPrice(p.getDiscountPrice())
                .effectivePrice(p.getEffectivePrice())
                .stockQuantity(p.getStockQuantity())
                .inStock(p.isInStock())
                .sku(p.getSku())
                .badge(p.getBadge())
                .rating(p.getRating())
                .reviewCount(p.getReviewCount())
                .warranty(p.getWarranty())
                .specifications(p.getSpecifications())
                .features(p.getFeatures())
                .category(ProductResponse.CategoryInfo.builder()
                        .id(p.getCategory().getId())
                        .name(p.getCategory().getName())
                        .slug(p.getCategory().getSlug())
                        .build())
                .createdAt(p.getCreatedAt() != null ? p.getCreatedAt().toString() : null)
                .build();
    }

    private List<String> parseImages(String additionalImages) {
        if (additionalImages == null || additionalImages.isBlank()) {
            return Collections.emptyList();
        }
        return Arrays.stream(additionalImages.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
    }
}
