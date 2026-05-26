package com.argo.ecommerce.service.impl;

import com.argo.ecommerce.dto.response.ProductResponse;
import com.argo.ecommerce.entity.Product;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Component
public class ProductMapper {

    private final ObjectMapper objectMapper;
    private static final Logger log = LoggerFactory.getLogger(ProductMapper.class);

    public ProductMapper(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

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
                .specifications(parseSpecifications(p.getSpecifications()))
                .features(parseFeatures(p.getFeatures()))
                .category(ProductResponse.CategoryInfo.builder()
                        .id(p.getCategory().getId())
                        .name(p.getCategory().getName())
                        .slug(p.getCategory().getSlug())
                        .productCount(p.getCategory().getProductCount())
                        .build())
                .createdAt(p.getCreatedAt() != null ? p.getCreatedAt().toString() : null)
                .build();
    }

    private Map<String, String> parseSpecifications(String raw) {
        if (raw == null || raw.isBlank()) {
            return Collections.emptyMap();
        }

        try {
            JsonNode node = objectMapper.readTree(raw);
            if (node.isObject()) {
                Map<String, String> map = new LinkedHashMap<>();
                node.fields().forEachRemaining(entry -> map.put(entry.getKey(), entry.getValue().asText()));
                return map;
            }
            if (node.isArray()) {
                return toIndexedMap(node);
            }
            if (node.isTextual()) {
                raw = node.textValue();
            }
        } catch (JsonProcessingException e) {
            log.debug("Product specifications are not JSON, parsing as semicolon-separated list: {}", raw, e);
        }

        return parseTextMap(raw);
    }

    private List<String> parseFeatures(String raw) {
        if (raw == null || raw.isBlank()) {
            return Collections.emptyList();
        }

        try {
            JsonNode node = objectMapper.readTree(raw);
            if (node.isArray()) {
                List<String> features = new ArrayList<>();
                node.forEach(element -> features.add(element.asText()));
                return features;
            }
            if (node.isObject()) {
                List<String> features = new ArrayList<>();
                node.fields().forEachRemaining(entry -> features.add(entry.getValue().asText()));
                return features;
            }
            if (node.isTextual()) {
                raw = node.textValue();
            }
        } catch (JsonProcessingException e) {
            log.debug("Product features are not JSON, parsing as semicolon-separated list: {}", raw, e);
        }

        return Arrays.stream(raw.split(";"))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
    }

    private Map<String, String> parseTextMap(String raw) {
        List<String> entries = Arrays.stream(raw.split(";"))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
        if (entries.isEmpty()) {
            return Collections.emptyMap();
        }

        boolean hasColon = entries.stream().anyMatch(entry -> entry.contains(":"));
        Map<String, String> result = new LinkedHashMap<>();
        for (int i = 0; i < entries.size(); i++) {
            String entry = entries.get(i);
            if (hasColon && entry.contains(":")) {
                int index = entry.indexOf(":");
                String key = entry.substring(0, index).trim();
                String value = entry.substring(index + 1).trim();
                result.put(key.isEmpty() ? "Specification " + (i + 1) : key, value);
            } else {
                result.put("Specification " + (i + 1), entry);
            }
        }
        return result;
    }

    private Map<String, String> toIndexedMap(JsonNode node) {
        Map<String, String> result = new LinkedHashMap<>();
        int index = 1;
        for (JsonNode element : node) {
            result.put("Specification " + index++, element.asText());
        }
        return result;
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
