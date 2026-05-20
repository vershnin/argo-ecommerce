package com.argo.ecommerce.dto.response;

import java.math.BigDecimal;
import java.util.List;

public class CartResponse {
    private List<CartItemDto> items;
    private BigDecimal totalAmount;
    private Integer itemCount;

    public CartResponse() {}
    public List<CartItemDto> getItems() { return items; }
    public BigDecimal getTotalAmount() { return totalAmount; }
    public Integer getItemCount() { return itemCount; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private final CartResponse r = new CartResponse();
        public Builder items(List<CartItemDto> v) { r.items = v; return this; }
        public Builder totalAmount(BigDecimal v) { r.totalAmount = v; return this; }
        public Builder itemCount(Integer v) { r.itemCount = v; return this; }
        public CartResponse build() { return r; }
    }

    public static class CartItemDto {
        private Long cartItemId, productId;
        private String name, imageUrl, slug;
        private BigDecimal price, subtotal;
        private Integer quantity, stockQuantity;

        public CartItemDto() {}
        public Long getCartItemId() { return cartItemId; }
        public Long getProductId() { return productId; }
        public String getName() { return name; }
        public String getSlug() { return slug; }
        public BigDecimal getPrice() { return price; }
        public Integer getQuantity() { return quantity; }
        public String getImageUrl() { return imageUrl; }
        public BigDecimal getSubtotal() { return subtotal; }
        public Integer getStockQuantity() { return stockQuantity; }

        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private final CartItemDto d = new CartItemDto();
            public Builder cartItemId(Long v) { d.cartItemId = v; return this; }
            public Builder productId(Long v) { d.productId = v; return this; }
            public Builder name(String v) { d.name = v; return this; }
            public Builder slug(String v) { d.slug = v; return this; }
            public Builder price(BigDecimal v) { d.price = v; return this; }
            public Builder quantity(Integer v) { d.quantity = v; return this; }
            public Builder imageUrl(String v) { d.imageUrl = v; return this; }
            public Builder subtotal(BigDecimal v) { d.subtotal = v; return this; }
            public Builder stockQuantity(Integer v) { d.stockQuantity = v; return this; }
            public CartItemDto build() { return d; }
        }
    }

