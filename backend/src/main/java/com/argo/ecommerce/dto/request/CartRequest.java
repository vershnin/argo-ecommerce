package com.argo.ecommerce.dto.request;

import jakarta.validation.constraints.*;

public class CartRequest {

    public static class AddItem {
        @NotNull(message = "Product ID is required") private Long productId;
        @NotNull @Min(value = 1) private Integer quantity = 1;

        public AddItem() {}
        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }
        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }

    public static class UpdateItem {
        @NotNull(message = "Product ID is required") private Long productId;
        @NotNull @Min(value = 1) private Integer quantity;

        public UpdateItem() {}
        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }
        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }
}
