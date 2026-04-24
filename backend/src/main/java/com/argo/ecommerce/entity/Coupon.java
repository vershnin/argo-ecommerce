package com.argo.ecommerce.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "coupons")
public class Coupon {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false) private String code;
    @Enumerated(EnumType.STRING) @Column(nullable = false) private CouponType type;
    @Column(nullable = false, precision = 10, scale = 2) private BigDecimal value;
    @Column(precision = 12, scale = 2) private BigDecimal minOrderAmount;
    private LocalDate expiresAt;
    private Boolean active = true;
    private Integer usageLimit;
    private Integer usageCount = 0;

    public enum CouponType { PERCENTAGE, FIXED }

    public Coupon() {}

    public boolean isValid(BigDecimal orderTotal) {
        if (!active) return false;
        if (expiresAt != null && LocalDate.now().isAfter(expiresAt)) return false;
        if (usageLimit != null && usageCount >= usageLimit) return false;
        if (minOrderAmount != null && orderTotal.compareTo(minOrderAmount) < 0) return false;
        return true;
    }

    public BigDecimal calculateDiscount(BigDecimal orderTotal) {
        if (type == CouponType.PERCENTAGE) {
            return orderTotal.multiply(value).divide(BigDecimal.valueOf(100));
        }
        return value.min(orderTotal);
    }

    public Long getId() { return id; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public CouponType getType() { return type; }
    public void setType(CouponType type) { this.type = type; }
    public BigDecimal getValue() { return value; }
    public void setValue(BigDecimal value) { this.value = value; }
    public BigDecimal getMinOrderAmount() { return minOrderAmount; }
    public void setMinOrderAmount(BigDecimal minOrderAmount) { this.minOrderAmount = minOrderAmount; }
    public LocalDate getExpiresAt() { return expiresAt; }
    public void setExpiresAt(LocalDate expiresAt) { this.expiresAt = expiresAt; }
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
    public Integer getUsageLimit() { return usageLimit; }
    public void setUsageLimit(Integer usageLimit) { this.usageLimit = usageLimit; }
    public Integer getUsageCount() { return usageCount; }
    public void setUsageCount(Integer usageCount) { this.usageCount = usageCount; }
}
