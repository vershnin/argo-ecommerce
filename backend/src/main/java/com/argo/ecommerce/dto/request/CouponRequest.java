package com.argo.ecommerce.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CouponRequest {
    @NotBlank
    private String code;

    @NotBlank
    private String type;

    @NotNull
    private String value;

    private String minOrderAmount;
    private String expiresAt;
    private Boolean active = true;

    public CouponRequest() {}

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getValue() { return value; }
    public void setValue(String value) { this.value = value; }
    public String getMinOrderAmount() { return minOrderAmount; }
    public void setMinOrderAmount(String minOrderAmount) { this.minOrderAmount = minOrderAmount; }
    public String getExpiresAt() { return expiresAt; }
    public void setExpiresAt(String expiresAt) { this.expiresAt = expiresAt; }
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
}
