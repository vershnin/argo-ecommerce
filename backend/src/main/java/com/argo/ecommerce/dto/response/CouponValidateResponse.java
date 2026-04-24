package com.argo.ecommerce.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.math.BigDecimal;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class CouponValidateResponse {
    private boolean valid;
    private String message, code, type;
    private BigDecimal value, discount;

    public CouponValidateResponse() {}
    public boolean isValid() { return valid; }
    public String getMessage() { return message; }
    public String getCode() { return code; }
    public String getType() { return type; }
    public BigDecimal getValue() { return value; }
    public BigDecimal getDiscount() { return discount; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private final CouponValidateResponse r = new CouponValidateResponse();
        public Builder valid(boolean v) { r.valid = v; return this; }
        public Builder message(String v) { r.message = v; return this; }
        public Builder code(String v) { r.code = v; return this; }
        public Builder type(String v) { r.type = v; return this; }
        public Builder value(BigDecimal v) { r.value = v; return this; }
        public Builder discount(BigDecimal v) { r.discount = v; return this; }
        public CouponValidateResponse build() { return r; }
    }
}
