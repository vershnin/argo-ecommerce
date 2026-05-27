package com.argo.ecommerce.controller;

import com.argo.ecommerce.dto.request.CategoryRequest;
import com.argo.ecommerce.dto.request.CouponRequest;
import com.argo.ecommerce.dto.request.ProductRequest;
import com.argo.ecommerce.dto.response.AdminSummaryResponse;
import com.argo.ecommerce.dto.response.CategoryResponse;
import com.argo.ecommerce.dto.response.CouponResponse;
import com.argo.ecommerce.dto.response.OrderResponse;
import com.argo.ecommerce.dto.response.PageResponse;
import com.argo.ecommerce.dto.response.ProductResponse;
import com.argo.ecommerce.service.impl.CategoryService;
import com.argo.ecommerce.service.impl.CouponService;
import com.argo.ecommerce.service.impl.OrderService;
import com.argo.ecommerce.service.impl.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Admin-only endpoints.
 * Protected at the URL level by SecurityConfig (/api/admin/** → ROLE_ADMIN)
 * and additionally guarded by @PreAuthorize for defence-in-depth.
 */
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final ProductService productService;
    private final OrderService orderService;
    private final CategoryService categoryService;
    private final CouponService couponService;

    // ── Categories ─────────────────────────────────────────────

    /**
     * POST /api/admin/categories
     */
    @PostMapping("/categories")
    public ResponseEntity<CategoryResponse> createCategory(
            @Valid @RequestBody CategoryRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(categoryService.createCategory(request));
    }

    /**
     * PUT /api/admin/categories/{id}
     */
    @PutMapping("/categories/{id}")
    public ResponseEntity<CategoryResponse> updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody CategoryRequest request) {
        return ResponseEntity.ok(categoryService.updateCategory(id, request));
    }

    /**
     * DELETE /api/admin/categories/{id}
     */
    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

    // ── Products ───────────────────────────────────────────────

    /**
     * POST /api/admin/products
     */
    @PostMapping("/products")
    public ResponseEntity<ProductResponse> createProduct(
            @Valid @RequestBody ProductRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(productService.createProduct(request));
    }

    /**
     * PUT /api/admin/products/{id}
     */
    @PutMapping("/products/{id}")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest request) {
        return ResponseEntity.ok(productService.updateProduct(id, request));
    }

    /**
     * DELETE /api/admin/products/{id}
     */
    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    // ── Orders ─────────────────────────────────────────────────

    /**
     * GET /api/admin/orders
     */
    @GetMapping("/orders")
    public ResponseEntity<PageResponse<OrderResponse>> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(orderService.getAllOrders(page, size));
    }

    @GetMapping("/summary")
    public ResponseEntity<AdminSummaryResponse> getSummary() {
        return ResponseEntity.ok(AdminSummaryResponse.builder()
                .totalProducts(productService.countProducts())
                .totalOrders(orderService.countOrders())
                .totalRevenue(orderService.calculateTotalRevenue())
                .activePromotions(couponService.countActivePromotions())
                .build());
    }

    @GetMapping("/coupons")
    public ResponseEntity<List<CouponResponse>> getCoupons() {
        return ResponseEntity.ok(couponService.listCoupons());
    }

    @PostMapping("/coupons")
    public ResponseEntity<CouponResponse> createCoupon(
            @Valid @RequestBody CouponRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(couponService.createCoupon(request));
    }

    @PutMapping("/coupons/{id}")
    public ResponseEntity<CouponResponse> updateCoupon(
            @PathVariable Long id,
            @Valid @RequestBody CouponRequest request) {
        return ResponseEntity.ok(couponService.updateCoupon(id, request));
    }

    @DeleteMapping("/coupons/{id}")
    public ResponseEntity<Void> deleteCoupon(@PathVariable Long id) {
        couponService.deleteCoupon(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * PATCH /api/admin/orders/{id}/status
     * Body: { "status": "SHIPPED" }
     */
    @PatchMapping("/orders/{id}/status")
    public ResponseEntity<OrderResponse> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        String status = body.get("status");
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }
}
