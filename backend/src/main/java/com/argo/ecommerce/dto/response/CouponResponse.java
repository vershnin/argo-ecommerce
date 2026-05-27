package com.argo.ecommerce.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.math.BigDecimal;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class CouponResponse {
    private Long id;
    private String code;
    private String type;
    private BigDecimal value;
    private BigDecimal minOrderAmount;
    private String expiresAt;
    private Boolean active;
    private Integer usageLimit;
    private Integer usageCount;

    public CouponResponse() {}

    public Long getId() { return id; }
    public String getCode() { return code; }
    public String getType() { return type; }
    public BigDecimal getValue() { return value; }
    public BigDecimal getMinOrderAmount() { return minOrderAmount; }
    public String getExpiresAt() { return expiresAt; }
    public Boolean getActive() { return active; }
    public Integer getUsageLimit() { return usageLimit; }
    public Integer getUsageCount() { return usageCount; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private final CouponResponse r = new CouponResponse();
        public Builder id(Long v) { r.id = v; return this; }
        public Builder code(String v) { r.code = v; return this; }
        public Builder type(String v) { r.type = v; return this; }
        public Builder value(BigDecimal v) { r.value = v; return this; }
        public Builder minOrderAmount(BigDecimal v) { r.minOrderAmount = v; return this; }
        public Builder expiresAt(String v) { r.expiresAt = v; return this; }
        public Builder active(Boolean v) { r.active = v; return this; }
        public Builder usageLimit(Integer v) { r.usageLimit = v; return this; }
        public Builder usageCount(Integer v) { r.usageCount = v; return this; }
        public CouponResponse build() { return r; }
    }
}
