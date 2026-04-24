package com.argo.ecommerce.controller;

import com.argo.ecommerce.dto.request.OrderRequest;
import com.argo.ecommerce.dto.response.OrderResponse;
import com.argo.ecommerce.dto.response.PageResponse;
import com.argo.ecommerce.security.UserPrincipal;
import com.argo.ecommerce.service.impl.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    /**
     * POST /api/orders
     * Creates order from current user's cart, deducts stock, clears cart.
     */
    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(
            @Valid @RequestBody OrderRequest request,
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(orderService.createOrder(principal.getId(), request));
    }

    /**
     * GET /api/orders
     * Returns the authenticated user's order history.
     */
    @GetMapping
    public ResponseEntity<PageResponse<OrderResponse>> getMyOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(orderService.getMyOrders(principal.getId(), page, size));
    }

    /**
     * GET /api/orders/{id}
     * Returns a specific order (must belong to current user).
     */
    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrderById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(orderService.getOrderById(principal.getId(), id));
    }
}
