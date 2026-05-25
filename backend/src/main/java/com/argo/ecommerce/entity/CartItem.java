package com.argo.ecommerce.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "cart_items", indexes = {
        @Index(name = "idx_cart_items_cart_id", columnList = "cart_id"),
        @Index(name = "idx_cart_items_product_id", columnList = "product_id")
})
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private Integer quantity;

    public CartItem() {}

    public BigDecimal getSubtotal() {
        return product.getEffectivePrice().multiply(BigDecimal.valueOf(quantity));
    }

    public Long getId() { return id; }
    public Cart getCart() { return cart; }
    public void setCart(Cart cart) { this.cart = cart; }
    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private final CartItem i = new CartItem();
        public Builder cart(Cart v) { i.cart = v; return this; }
        public Builder product(Product v) { i.product = v; return this; }
        public Builder quantity(Integer v) { i.quantity = v; return this; }
        public CartItem build() { return i; }
    }
}
