package com.argo.ecommerce.dto.request;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public class CouponValidateRequest {
    @NotBlank private String code;
    @NotNull private BigDecimal orderTotal;

    public CouponValidateRequest() {}
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public BigDecimal getOrderTotal() { return orderTotal; }
    public void setOrderTotal(BigDecimal orderTotal) { this.orderTotal = orderTotal; }
}
