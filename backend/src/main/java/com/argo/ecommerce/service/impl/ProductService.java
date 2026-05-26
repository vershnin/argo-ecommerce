package com.argo.ecommerce.service.impl;

import com.argo.ecommerce.dto.request.ProductRequest;
import com.argo.ecommerce.dto.response.PageResponse;
import com.argo.ecommerce.dto.response.ProductResponse;
import com.argo.ecommerce.entity.Category;
import com.argo.ecommerce.entity.Product;
import com.argo.ecommerce.exception.ResourceNotFoundException;
import com.argo.ecommerce.repository.CategoryRepository;
import com.argo.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.text.Normalizer;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper mapper;

    // ── Public reads ───────────────────────────────────────────

    @Transactional(readOnly = true)
    public PageResponse<ProductResponse> getProducts(
            String keyword, Long categoryId, String brand,
            BigDecimal minPrice, BigDecimal maxPrice,
            Boolean inStock, String sort,
            int page, int size) {

        List<String> brands = null;
        if (brand != null && !brand.isBlank()) {
            brands = Arrays.stream(brand.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .map(String::toLowerCase)
                    .toList();
            if (brands.isEmpty()) {
                brands = null;
            }
        }

        Pageable pageable = PageRequest.of(page, size, resolveSort(sort));
        Page<Product> result = productRepository.searchProducts(
                keyword, categoryId, brands, minPrice, maxPrice, inStock, pageable);

        return toPageResponse(result);
    }

    @Transactional(readOnly = true)
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id));
        return mapper.toResponse(product);
    }

    @Transactional(readOnly = true)
    public ProductResponse getProductBySlug(String slug) {
        Product product = productRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + slug));
        return mapper.toResponse(product);
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> getRelatedProducts(Long productId, int limit) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + productId));
        Page<Product> related = productRepository.findRelatedProducts(
                product.getCategory().getId(), productId, PageRequest.of(0, limit));
        return related.getContent().stream().map(mapper::toResponse).toList();
    }

    // ── Admin CRUD ─────────────────────────────────────────────

    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Category not found: " + request.getCategoryId()));

        String slug = request.getSlug() != null && !request.getSlug().isBlank()
                ? request.getSlug()
                : generateSlug(request.getName());

        // Ensure slug uniqueness
        if (productRepository.existsBySlug(slug)) {
            slug = slug + "-" + System.currentTimeMillis();
        }

        Product product = Product.builder()
                .name(request.getName())
                .slug(slug)
                .description(request.getDescription())
                .shortDescription(request.getShortDescription())
                .brand(request.getBrand())
                .imageUrl(request.getImageUrl())
                .additionalImages(request.getAdditionalImages())
                .price(request.getPrice())
                .discountPrice(request.getDiscountPrice())
                .stockQuantity(request.getStockQuantity())
                .sku(request.getSku())
                .badge(request.getBadge())
                .warranty(request.getWarranty())
                .specifications(request.getSpecifications())
                .features(request.getFeatures())
                .category(category)
                .rating(0.0)
                .reviewCount(0)
                .build();

        return mapper.toResponse(productRepository.save(product));
    }

    @Transactional
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Category not found: " + request.getCategoryId()));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setShortDescription(request.getShortDescription());
        product.setBrand(request.getBrand());
        product.setImageUrl(request.getImageUrl());
        product.setAdditionalImages(request.getAdditionalImages());
        product.setPrice(request.getPrice());
        product.setDiscountPrice(request.getDiscountPrice());
        product.setStockQuantity(request.getStockQuantity());
        product.setSku(request.getSku());
        product.setBadge(request.getBadge());
        product.setWarranty(request.getWarranty());
        product.setSpecifications(request.getSpecifications());
        product.setFeatures(request.getFeatures());
        product.setCategory(category);

        return mapper.toResponse(productRepository.save(product));
    }

    @Transactional
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found: " + id);
        }
        productRepository.deleteById(id);
    }

    // ── Helpers ────────────────────────────────────────────────

    private PageResponse<ProductResponse> toPageResponse(Page<Product> page) {
        return PageResponse.<ProductResponse>builder()
                .content(page.getContent().stream().map(mapper::toResponse).toList())
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .last(page.isLast())
                .first(page.isFirst())
                .build();
    }

    private Sort resolveSort(String sort) {
        if (sort == null) return Sort.by("createdAt").descending();
        return switch (sort) {
            case "price-asc"  -> Sort.by("price").ascending();
            case "price-desc" -> Sort.by("price").descending();
            case "name-asc"   -> Sort.by("name").ascending();
            case "rating"     -> Sort.by("rating").descending();
            default           -> Sort.by("createdAt").descending();
        };
    }

    private static final Pattern NON_LATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]+");

    public static String generateSlug(String input) {
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);
        return NON_LATIN.matcher(
                WHITESPACE.matcher(normalized.toLowerCase(Locale.ENGLISH)).replaceAll("-")
        ).replaceAll("").replaceAll("-+", "-");
    }
}
