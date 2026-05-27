package com.argo.ecommerce.dto.response;

import java.math.BigDecimal;

public class AdminSummaryResponse {
    private long totalProducts;
    private long totalOrders;
    private BigDecimal totalRevenue;
    private long activePromotions;

    public AdminSummaryResponse() {}

    public long getTotalProducts() { return totalProducts; }
    public long getTotalOrders() { return totalOrders; }
    public BigDecimal getTotalRevenue() { return totalRevenue; }
    public long getActivePromotions() { return activePromotions; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private final AdminSummaryResponse r = new AdminSummaryResponse();
        public Builder totalProducts(long v) { r.totalProducts = v; return this; }
        public Builder totalOrders(long v) { r.totalOrders = v; return this; }
        public Builder totalRevenue(BigDecimal v) { r.totalRevenue = v; return this; }
        public Builder activePromotions(long v) { r.activePromotions = v; return this; }
        public AdminSummaryResponse build() { return r; }
    }
}
