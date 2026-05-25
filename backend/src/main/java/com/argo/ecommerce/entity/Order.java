package com.argo.ecommerce.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders", indexes = {
        @Index(name = "idx_orders_user_created", columnList = "user_id, created_at")
})
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String orderNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<OrderItem> items = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status = OrderStatus.PENDING;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal subtotal;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal deliveryFee = BigDecimal.ZERO;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal discount = BigDecimal.ZERO;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal totalAmount;

    private String deliveryMethod;
    private String promoCode;
    private String shippingFullName;
    private String shippingPhone;
    private String shippingEmail;
    private String shippingStreet;
    private String shippingCity;
    private String shippingRegion;
    private String shippingNotes;
    private String paymentStatus;
    private String paymentReference;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public Order() {}

    // Getters & Setters
    public Long getId() { return id; }
    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }
    public OrderStatus getStatus() { return status; }
    public void setStatus(OrderStatus status) { this.status = status; }
    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }
    public BigDecimal getDeliveryFee() { return deliveryFee; }
    public void setDeliveryFee(BigDecimal deliveryFee) { this.deliveryFee = deliveryFee; }
    public BigDecimal getDiscount() { return discount; }
    public void setDiscount(BigDecimal discount) { this.discount = discount; }
    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }
    public String getDeliveryMethod() { return deliveryMethod; }
    public void setDeliveryMethod(String deliveryMethod) { this.deliveryMethod = deliveryMethod; }
    public String getPromoCode() { return promoCode; }
    public void setPromoCode(String promoCode) { this.promoCode = promoCode; }
    public String getShippingFullName() { return shippingFullName; }
    public void setShippingFullName(String v) { this.shippingFullName = v; }
    public String getShippingPhone() { return shippingPhone; }
    public void setShippingPhone(String v) { this.shippingPhone = v; }
    public String getShippingEmail() { return shippingEmail; }
    public void setShippingEmail(String v) { this.shippingEmail = v; }
    public String getShippingStreet() { return shippingStreet; }
    public void setShippingStreet(String v) { this.shippingStreet = v; }
    public String getShippingCity() { return shippingCity; }
    public void setShippingCity(String v) { this.shippingCity = v; }
    public String getShippingRegion() { return shippingRegion; }
    public void setShippingRegion(String v) { this.shippingRegion = v; }
    public String getShippingNotes() { return shippingNotes; }
    public void setShippingNotes(String v) { this.shippingNotes = v; }
    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }
    public String getPaymentReference() { return paymentReference; }
    public void setPaymentReference(String v) { this.paymentReference = v; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private final Order o = new Order();
        public Builder orderNumber(String v) { o.orderNumber = v; return this; }
        public Builder user(User v) { o.user = v; return this; }
        public Builder status(OrderStatus v) { o.status = v; return this; }
        public Builder subtotal(BigDecimal v) { o.subtotal = v; return this; }
        public Builder deliveryFee(BigDecimal v) { o.deliveryFee = v; return this; }
        public Builder discount(BigDecimal v) { o.discount = v; return this; }
        public Builder totalAmount(BigDecimal v) { o.totalAmount = v; return this; }
        public Builder deliveryMethod(String v) { o.deliveryMethod = v; return this; }
        public Builder promoCode(String v) { o.promoCode = v; return this; }
        public Builder shippingFullName(String v) { o.shippingFullName = v; return this; }
        public Builder shippingPhone(String v) { o.shippingPhone = v; return this; }
        public Builder shippingEmail(String v) { o.shippingEmail = v; return this; }
        public Builder shippingStreet(String v) { o.shippingStreet = v; return this; }
        public Builder shippingCity(String v) { o.shippingCity = v; return this; }
        public Builder shippingRegion(String v) { o.shippingRegion = v; return this; }
        public Builder shippingNotes(String v) { o.shippingNotes = v; return this; }
        public Builder paymentStatus(String v) { o.paymentStatus = v; return this; }
        public Order build() { return o; }
    }
}
