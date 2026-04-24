package com.argo.ecommerce.service.impl;

import com.argo.ecommerce.dto.request.CartRequest;
import com.argo.ecommerce.dto.response.CartResponse;
import com.argo.ecommerce.entity.Cart;
import com.argo.ecommerce.entity.CartItem;
import com.argo.ecommerce.entity.Product;
import com.argo.ecommerce.entity.User;
import com.argo.ecommerce.exception.BadRequestException;
import com.argo.ecommerce.exception.ResourceNotFoundException;
import com.argo.ecommerce.repository.CartItemRepository;
import com.argo.ecommerce.repository.CartRepository;
import com.argo.ecommerce.repository.ProductRepository;
import com.argo.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public CartResponse getCart(Long userId) {
        Cart cart = cartRepository.findByUserIdWithItems(userId)
                .orElseGet(() -> createEmptyCart(userId));
        return toResponse(cart);
    }

    @Transactional
    public CartResponse addItem(Long userId, CartRequest.AddItem request) {
        Cart cart = cartRepository.findByUserIdWithItems(userId)
                .orElseGet(() -> createEmptyCart(userId));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Product not found: " + request.getProductId()));

        if (!product.isInStock()) {
            throw new BadRequestException("Product is out of stock: " + product.getName());
        }
        if (request.getQuantity() > product.getStockQuantity()) {
            throw new BadRequestException("Requested quantity exceeds available stock ("
                    + product.getStockQuantity() + ")");
        }

        cartItemRepository.findByCartIdAndProductId(cart.getId(), product.getId())
                .ifPresentOrElse(
                        existing -> {
                            int newQty = existing.getQuantity() + request.getQuantity();
                            if (newQty > product.getStockQuantity()) {
                                throw new BadRequestException(
                                        "Total quantity would exceed stock (" + product.getStockQuantity() + ")");
                            }
                            existing.setQuantity(newQty);
                            cartItemRepository.save(existing);
                        },
                        () -> {
                            CartItem item = CartItem.builder()
                                    .cart(cart)
                                    .product(product)
                                    .quantity(request.getQuantity())
                                    .build();
                            cart.getItems().add(cartItemRepository.save(item));
                        }
                );

        Cart refreshed = cartRepository.findByUserIdWithItems(userId).orElseThrow();
        return toResponse(refreshed);
    }

    @Transactional
    public CartResponse updateItem(Long userId, CartRequest.UpdateItem request) {
        Cart cart = cartRepository.findByUserIdWithItems(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

        CartItem item = cartItemRepository
                .findByCartIdAndProductId(cart.getId(), request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Item not in cart: productId=" + request.getProductId()));

        Product product = item.getProduct();
        if (request.getQuantity() > product.getStockQuantity()) {
            throw new BadRequestException("Quantity exceeds available stock ("
                    + product.getStockQuantity() + ")");
        }

        item.setQuantity(request.getQuantity());
        cartItemRepository.save(item);

        Cart refreshed = cartRepository.findByUserIdWithItems(userId).orElseThrow();
        return toResponse(refreshed);
    }

    @Transactional
    public CartResponse removeItem(Long userId, Long cartItemId) {
        Cart cart = cartRepository.findByUserIdWithItems(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found: " + cartItemId));

        // Security: ensure the item actually belongs to this user's cart
        if (!item.getCart().getId().equals(cart.getId())) {
            throw new BadRequestException("Cart item does not belong to current user");
        }

        cart.getItems().remove(item);
        cartItemRepository.delete(item);

        Cart refreshed = cartRepository.findByUserIdWithItems(userId).orElseThrow();
        return toResponse(refreshed);
    }

    @Transactional
    public void clearCart(Long userId) {
        cartRepository.findByUserIdWithItems(userId).ifPresent(cart -> {
            cart.getItems().clear();
            cartRepository.save(cart);
        });
    }

    // ── Helpers ────────────────────────────────────────────────

    private Cart createEmptyCart(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));
        Cart cart = Cart.builder().user(user).build();
        return cartRepository.save(cart);
    }

    private CartResponse toResponse(Cart cart) {
        List<CartResponse.CartItemDto> items = cart.getItems().stream()
                .map(item -> CartResponse.CartItemDto.builder()
                        .cartItemId(item.getId())
                        .productId(item.getProduct().getId())
                        .name(item.getProduct().getName())
                        .price(item.getProduct().getEffectivePrice())
                        .quantity(item.getQuantity())
                        .imageUrl(item.getProduct().getImageUrl())
                        .subtotal(item.getSubtotal())
                        .stockQuantity(item.getProduct().getStockQuantity())
                        .build())
                .toList();

        return CartResponse.builder()
                .items(items)
                .totalAmount(cart.getTotalAmount())
                .itemCount(items.stream().mapToInt(CartResponse.CartItemDto::getQuantity).sum())
                .build();
    }
}
