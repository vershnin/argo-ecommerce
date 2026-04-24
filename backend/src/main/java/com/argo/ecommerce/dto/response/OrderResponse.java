package com.argo.ecommerce.dto.response;

import java.math.BigDecimal;
import java.util.List;

public class OrderResponse {
    private Long orderId;
    private String orderNumber;
    private List<OrderItemDto> items;
    private BigDecimal subtotal;
    private BigDecimal deliveryFee;
    private BigDecimal discount;
    private BigDecimal totalAmount;
    private String status;
    private String deliveryMethod;
    private String promoCode;
    private ShippingAddressDto shippingAddress;
    private String createdAt;
    private String updatedAt;

    public OrderResponse() {}

    public Long getOrderId() { return orderId; }
    public String getOrderNumber() { return orderNumber; }
    public List<OrderItemDto> getItems() { return items; }
    public BigDecimal getSubtotal() { return subtotal; }
    public BigDecimal getDeliveryFee() { return deliveryFee; }
    public BigDecimal getDiscount() { return discount; }
    public BigDecimal getTotalAmount() { return totalAmount; }
    public String getStatus() { return status; }
    public String getDeliveryMethod() { return deliveryMethod; }
    public String getPromoCode() { return promoCode; }
    public ShippingAddressDto getShippingAddress() { return shippingAddress; }
    public String getCreatedAt() { return createdAt; }
    public String getUpdatedAt() { return updatedAt; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private final OrderResponse r = new OrderResponse();
        public Builder orderId(Long v) { r.orderId = v; return this; }
        public Builder orderNumber(String v) { r.orderNumber = v; return this; }
        public Builder items(List<OrderItemDto> v) { r.items = v; return this; }
        public Builder subtotal(BigDecimal v) { r.subtotal = v; return this; }
        public Builder deliveryFee(BigDecimal v) { r.deliveryFee = v; return this; }
        public Builder discount(BigDecimal v) { r.discount = v; return this; }
        public Builder totalAmount(BigDecimal v) { r.totalAmount = v; return this; }
        public Builder status(String v) { r.status = v; return this; }
        public Builder deliveryMethod(String v) { r.deliveryMethod = v; return this; }
        public Builder promoCode(String v) { r.promoCode = v; return this; }
        public Builder shippingAddress(ShippingAddressDto v) { r.shippingAddress = v; return this; }
        public Builder createdAt(String v) { r.createdAt = v; return this; }
        public Builder updatedAt(String v) { r.updatedAt = v; return this; }
        public OrderResponse build() { return r; }
    }

    public static class OrderItemDto {
        private Long productId;
        private String name;
        private String imageUrl;
        private BigDecimal unitPrice;
        private Integer quantity;
        private BigDecimal subtotal;

        public OrderItemDto() {}
        public Long getProductId() { return productId; }
        public String getName() { return name; }
        public String getImageUrl() { return imageUrl; }
        public BigDecimal getUnitPrice() { return unitPrice; }
        public Integer getQuantity() { return quantity; }
        public BigDecimal getSubtotal() { return subtotal; }

        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private final OrderItemDto d = new OrderItemDto();
            public Builder productId(Long v) { d.productId = v; return this; }
            public Builder name(String v) { d.name = v; return this; }
            public Builder imageUrl(String v) { d.imageUrl = v; return this; }
            public Builder unitPrice(BigDecimal v) { d.unitPrice = v; return this; }
            public Builder quantity(Integer v) { d.quantity = v; return this; }
            public Builder subtotal(BigDecimal v) { d.subtotal = v; return this; }
            public OrderItemDto build() { return d; }
        }
    }

    public static class ShippingAddressDto {
        private String fullName, phone, email, street, city, region, notes;
        public ShippingAddressDto() {}
        public String getFullName() { return fullName; }
        public String getPhone() { return phone; }
        public String getEmail() { return email; }
        public String getStreet() { return street; }
        public String getCity() { return city; }
        public String getRegion() { return region; }
        public String getNotes() { return notes; }

        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private final ShippingAddressDto d = new ShippingAddressDto();
            public Builder fullName(String v) { d.fullName = v; return this; }
            public Builder phone(String v) { d.phone = v; return this; }
            public Builder email(String v) { d.email = v; return this; }
            public Builder street(String v) { d.street = v; return this; }
            public Builder city(String v) { d.city = v; return this; }
            public Builder region(String v) { d.region = v; return this; }
            public Builder notes(String v) { d.notes = v; return this; }
            public ShippingAddressDto build() { return d; }
        }
    }
}
