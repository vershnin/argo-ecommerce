package com.argo.ecommerce.controller;

import com.argo.ecommerce.dto.response.ProductResponse;
import com.argo.ecommerce.security.UserPrincipal;
import com.argo.ecommerce.service.impl.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getWishlist(
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(wishlistService.getWishlist(principal.getId()));
    }

    @PostMapping("/{productId}")
    public ResponseEntity<Map<String, Boolean>> addToWishlist(
            @PathVariable Long productId,
            @AuthenticationPrincipal UserPrincipal principal) {
        wishlistService.addToWishlist(principal.getId(), productId);
        return ResponseEntity.ok(Map.of("wishlisted", true));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Map<String, Boolean>> removeFromWishlist(
            @PathVariable Long productId,
            @AuthenticationPrincipal UserPrincipal principal) {
        wishlistService.removeFromWishlist(principal.getId(), productId);
        return ResponseEntity.ok(Map.of("wishlisted", false));
    }

    @GetMapping("/{productId}/status")
    public ResponseEntity<Map<String, Boolean>> checkWishlist(
            @PathVariable Long productId,
            @AuthenticationPrincipal UserPrincipal principal) {
        boolean wishlisted = wishlistService.isInWishlist(principal.getId(), productId);
        return ResponseEntity.ok(Map.of("wishlisted", wishlisted));
    }
}
