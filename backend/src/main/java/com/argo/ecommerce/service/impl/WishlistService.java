package com.argo.ecommerce.service.impl;

import com.argo.ecommerce.dto.response.ProductResponse;
import com.argo.ecommerce.entity.Product;
import com.argo.ecommerce.entity.User;
import com.argo.ecommerce.entity.Wishlist;
import com.argo.ecommerce.exception.ResourceNotFoundException;
import com.argo.ecommerce.repository.ProductRepository;
import com.argo.ecommerce.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;
    private final ProductMapper mapper;

    @Transactional(readOnly = true)
    public List<ProductResponse> getWishlist(Long userId) {
        return wishlistRepository.findByUserIdWithProduct(userId).stream()
                .map(w -> mapper.toResponse(w.getProduct()))
                .toList();
    }

    @Transactional
    public void addToWishlist(Long userId, Long productId) {
        if (wishlistRepository.existsByUserIdAndProductId(userId, productId)) return;

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + productId));

        Wishlist entry = Wishlist.builder()
                .user(User.builder().id(userId).build())
                .product(product)
                .build();
        wishlistRepository.save(entry);
    }

    @Transactional
    public void removeFromWishlist(Long userId, Long productId) {
        wishlistRepository.deleteByUserIdAndProductId(userId, productId);
    }

    @Transactional(readOnly = true)
    public boolean isInWishlist(Long userId, Long productId) {
        return wishlistRepository.existsByUserIdAndProductId(userId, productId);
    }
}
