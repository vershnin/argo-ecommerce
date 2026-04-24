package com.argo.ecommerce.controller;

import com.argo.ecommerce.dto.request.ReviewRequest;
import com.argo.ecommerce.dto.response.PageResponse;
import com.argo.ecommerce.dto.response.ProductResponse;
import com.argo.ecommerce.dto.response.ReviewResponse;
import com.argo.ecommerce.security.UserPrincipal;
import com.argo.ecommerce.service.impl.ProductService;
import com.argo.ecommerce.service.impl.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final ReviewService reviewService;

    /**
     * GET /api/products
     * Supports: ?keyword=&categoryId=&minPrice=&maxPrice=&inStock=&sort=&page=0&size=12
     */
    @GetMapping
    public ResponseEntity<PageResponse<ProductResponse>> getProducts(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Boolean inStock,
            @RequestParam(required = false, defaultValue = "newest") String sort,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        return ResponseEntity.ok(productService.getProducts(
                keyword, categoryId, minPrice, maxPrice, inStock, sort, page, size));
    }

    /**
     * GET /api/products/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    /**
     * GET /api/products/slug/{slug}
     */
    @GetMapping("/slug/{slug}")
    public ResponseEntity<ProductResponse> getProductBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(productService.getProductBySlug(slug));
    }

    /**
     * GET /api/products/{id}/related
     */
    @GetMapping("/{id}/related")
    public ResponseEntity<List<ProductResponse>> getRelatedProducts(
            @PathVariable Long id,
            @RequestParam(defaultValue = "4") int limit) {
        return ResponseEntity.ok(productService.getRelatedProducts(id, limit));
    }

    /**
     * GET /api/products/{id}/reviews
     */
    @GetMapping("/{id}/reviews")
    public ResponseEntity<PageResponse<ReviewResponse>> getReviews(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(reviewService.getProductReviews(id, page, size));
    }

    /**
     * POST /api/products/{id}/reviews
     * Requires authentication
     */
    @PostMapping("/{id}/reviews")
    public ResponseEntity<ReviewResponse> submitReview(
            @PathVariable Long id,
            @Valid @RequestBody ReviewRequest request,
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reviewService.submitReview(id, principal.getId(), request));
    }
}
