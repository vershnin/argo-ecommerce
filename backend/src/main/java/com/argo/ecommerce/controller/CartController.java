package com.argo.ecommerce.controller;

import com.argo.ecommerce.dto.request.CartRequest;
import com.argo.ecommerce.dto.response.CartResponse;
import com.argo.ecommerce.security.UserPrincipal;
import com.argo.ecommerce.service.impl.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    /**
     * GET /api/cart
     * Returns the current user's cart in the shape the React frontend expects:
     * { items: [...], totalAmount, itemCount }
     */
    @GetMapping
    public ResponseEntity<CartResponse> getCart(
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(cartService.getCart(principal.getId()));
    }

    /**
     * POST /api/cart/add
     * Body: { productId, quantity }
     */
    @PostMapping("/add")
    public ResponseEntity<CartResponse> addItem(
            @Valid @RequestBody CartRequest.AddItem request,
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(cartService.addItem(principal.getId(), request));
    }

    /**
     * PUT /api/cart/update
     * Body: { productId, quantity }
     */
    @PutMapping("/update")
    public ResponseEntity<CartResponse> updateItem(
            @Valid @RequestBody CartRequest.UpdateItem request,
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(cartService.updateItem(principal.getId(), request));
    }

    /**
     * DELETE /api/cart/remove/{itemId}
     * itemId is the cart_items.id (cartItemId from CartResponse)
     */
    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<CartResponse> removeItem(
            @PathVariable Long itemId,
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(cartService.removeItem(principal.getId(), itemId));
    }

    /**
     * DELETE /api/cart/clear
     */
    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(
            @AuthenticationPrincipal UserPrincipal principal) {
        cartService.clearCart(principal.getId());
        return ResponseEntity.noContent().build();
    }

    /**
     * POST /api/cart/merge
     * Body: { items: [{ productId, quantity }, ...] }
     */
    @PostMapping("/merge")
    public ResponseEntity<CartResponse> mergeCart(
            @Valid @RequestBody CartRequest.MergeRequest request,
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(cartService.mergeCart(principal.getId(), request));
    }
}
