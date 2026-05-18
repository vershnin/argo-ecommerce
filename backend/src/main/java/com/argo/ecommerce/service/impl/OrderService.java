package com.argo.ecommerce.service.impl;

import com.argo.ecommerce.dto.request.OrderRequest;
import com.argo.ecommerce.dto.response.OrderResponse;
import com.argo.ecommerce.dto.response.PageResponse;
import com.argo.ecommerce.entity.*;
import com.argo.ecommerce.exception.BadRequestException;
import com.argo.ecommerce.exception.ResourceNotFoundException;
import com.argo.ecommerce.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.argo.ecommerce.service.impl.EmailNotificationService;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final CouponRepository couponRepository;
    private final UserRepository userRepository;
    private final EmailNotificationService emailNotificationService;

    // ── Create order from cart ─────────────────────────────────

    @Transactional
    public OrderResponse createOrder(Long userId, OrderRequest request) {
        Cart cart = cartRepository.findByUserIdWithItems(userId)
                .orElseThrow(() -> new BadRequestException("Cart is empty"));

        if (cart.getItems().isEmpty()) {
            throw new BadRequestException("Cannot create order from empty cart");
        }

        // Validate stock and build order items
        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal subtotal = BigDecimal.ZERO;

        for (CartItem cartItem : cart.getItems()) {
            Product product = cartItem.getProduct();

            // Re-fetch with lock to prevent race conditions
            Product lockedProduct = productRepository.findById(product.getId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Product not found: " + product.getId()));

            if (lockedProduct.getStockQuantity() < cartItem.getQuantity()) {
                throw new BadRequestException("Insufficient stock for: " + lockedProduct.getName()
                        + " (available: " + lockedProduct.getStockQuantity() + ")");
            }

            BigDecimal unitPrice = lockedProduct.getEffectivePrice();
            BigDecimal itemSubtotal = unitPrice.multiply(BigDecimal.valueOf(cartItem.getQuantity()));

            OrderItem orderItem = OrderItem.builder()
                    .product(lockedProduct)
                    .productName(lockedProduct.getName())
                    .productImageUrl(lockedProduct.getImageUrl())
                    .unitPrice(unitPrice)
                    .quantity(cartItem.getQuantity())
                    .subtotal(itemSubtotal)
                    .build();

            orderItems.add(orderItem);
            subtotal = subtotal.add(itemSubtotal);

            // ── Deduct inventory ──────────────────────────────
            lockedProduct.setStockQuantity(
                    lockedProduct.getStockQuantity() - cartItem.getQuantity());
            productRepository.save(lockedProduct);
        }

        // Calculate delivery fee
        BigDecimal deliveryFee = calculateDeliveryFee(request.getDeliveryMethod(), subtotal);

        // Apply coupon discount
        BigDecimal discount = BigDecimal.ZERO;
        String appliedCoupon = null;
        if (request.getPromoCode() != null && !request.getPromoCode().isBlank()) {
            Coupon coupon = couponRepository.findByCodeIgnoreCase(request.getPromoCode())
                    .orElseThrow(() -> new BadRequestException("Invalid promo code"));
            if (!coupon.isValid(subtotal)) {
                throw new BadRequestException("Promo code is not valid for this order");
            }
            discount = coupon.calculateDiscount(subtotal);
            coupon.setUsageCount(coupon.getUsageCount() + 1);
            couponRepository.save(coupon);
            appliedCoupon = coupon.getCode();
        }

        BigDecimal totalAmount = subtotal.add(deliveryFee).subtract(discount);

        // Build shipping address snapshot
        OrderRequest.ShippingAddress addr = request.getShippingAddress();

        // Create the order
        Order order = Order.builder()
                .orderNumber(generateOrderNumber())
                .user(userRepository.getReferenceById(userId)) // session-bound proxy
                .status(OrderStatus.PENDING)
                .subtotal(subtotal)
                .deliveryFee(deliveryFee)
                .discount(discount)
                .totalAmount(totalAmount)
                .deliveryMethod(request.getDeliveryMethod())
                .promoCode(appliedCoupon)
                .shippingFullName(addr.getFullName())
                .shippingPhone(addr.getPhone())
                .shippingEmail(addr.getEmail())
                .shippingStreet(addr.getStreet())
                .shippingCity(addr.getCity())
                .shippingRegion(addr.getRegion())
                .shippingNotes(addr.getNotes())
                .paymentStatus("PENDING")
                .build();

        Order saved = orderRepository.save(order);

        // Link items to order
        orderItems.forEach(item -> item.setOrder(saved));
        saved.setItems(orderItems);
        orderRepository.save(saved);

        // Clear the cart after successful order
        cart.getItems().clear();
        cartRepository.save(cart);

        emailNotificationService.sendOrderCreatedNotification(saved);
        return toResponse(saved);
    }

    // ── Reads ──────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public PageResponse<OrderResponse> getMyOrders(Long userId, int page, int size) {
        Page<Order> orders = orderRepository.findByUserIdOrderByCreatedAtDesc(
                userId, PageRequest.of(page, size));
        return toPageResponse(orders);
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrderById(Long userId, Long orderId) {
        Order order = orderRepository.findByIdWithItems(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found: " + orderId));

        // Customers can only see their own orders
        if (!order.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Order not found: " + orderId);
        }
        return toResponse(order);
    }

    // ── Admin ──────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public PageResponse<OrderResponse> getAllOrders(int page, int size) {
        Page<Order> orders = orderRepository.findAllByOrderByCreatedAtDesc(
                PageRequest.of(page, size, Sort.by("createdAt").descending()));
        return toPageResponse(orders);
    }

    @Transactional
    public OrderResponse updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findByIdWithItems(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found: " + orderId));
        OrderStatus previousStatus = order.getStatus();
        try {
            order.setStatus(OrderStatus.valueOf(status.toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid order status: " + status);
        }

        Order savedOrder = orderRepository.save(order);
        emailNotificationService.sendOrderStatusChangedNotification(savedOrder, previousStatus);
        return toResponse(savedOrder);
    }

    // ── Helpers ────────────────────────────────────────────────

    private BigDecimal calculateDeliveryFee(String method, BigDecimal subtotal) {
        // Free delivery over KSH 10,000
        if (subtotal.compareTo(BigDecimal.valueOf(10_000)) >= 0) return BigDecimal.ZERO;
        return switch (method != null ? method.toLowerCase() : "standard") {
            case "express" -> BigDecimal.valueOf(500);
            case "pickup"  -> BigDecimal.ZERO;
            default        -> BigDecimal.valueOf(300); // standard
        };
    }

    private String generateOrderNumber() {
        return "ARG-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    private PageResponse<OrderResponse> toPageResponse(Page<Order> page) {
        return PageResponse.<OrderResponse>builder()
                .content(page.getContent().stream().map(this::toResponse).toList())
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .last(page.isLast())
                .first(page.isFirst())
                .build();
    }

    private OrderResponse toResponse(Order order) {
        List<OrderResponse.OrderItemDto> items = order.getItems() == null ? List.of() :
                order.getItems().stream().map(item -> OrderResponse.OrderItemDto.builder()
                        .productId(item.getProduct() != null ? item.getProduct().getId() : null)
                        .name(item.getProductName())
                        .imageUrl(item.getProductImageUrl())
                        .unitPrice(item.getUnitPrice())
                        .quantity(item.getQuantity())
                        .subtotal(item.getSubtotal())
                        .build()).toList();

        return OrderResponse.builder()
                .orderId(order.getId())
                .orderNumber(order.getOrderNumber())
                .items(items)
                .subtotal(order.getSubtotal())
                .deliveryFee(order.getDeliveryFee())
                .discount(order.getDiscount())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus().name())
                .deliveryMethod(order.getDeliveryMethod())
                .promoCode(order.getPromoCode())
                .shippingAddress(OrderResponse.ShippingAddressDto.builder()
                        .fullName(order.getShippingFullName())
                        .phone(order.getShippingPhone())
                        .email(order.getShippingEmail())
                        .street(order.getShippingStreet())
                        .city(order.getShippingCity())
                        .region(order.getShippingRegion())
                        .notes(order.getShippingNotes())
                        .build())
                .createdAt(order.getCreatedAt() != null ? order.getCreatedAt().toString() : null)
                .updatedAt(order.getUpdatedAt() != null ? order.getUpdatedAt().toString() : null)
                .build();
    }
}
