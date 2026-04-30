package com.argo.ecommerce.dto.response;

import java.math.BigDecimal;
import java.util.List;

public class ProductResponse {
    private Long id;
    private String name, slug, description, shortDescription, brand, imageUrl;
    private List<String> additionalImages;
    private BigDecimal price, discountPrice, effectivePrice;
    private Integer stockQuantity;
    private boolean inStock;
    private String sku, badge, warranty, createdAt;
    private Object specifications, features;
    private Double rating;
    private Integer reviewCount;
    private CategoryInfo category;

    public ProductResponse() {}

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getSlug() { return slug; }
    public String getDescription() { return description; }
    public String getShortDescription() { return shortDescription; }
    public String getBrand() { return brand; }
    public String getImageUrl() { return imageUrl; }
    public List<String> getAdditionalImages() { return additionalImages; }
    public BigDecimal getPrice() { return price; }
    public BigDecimal getDiscountPrice() { return discountPrice; }
    public BigDecimal getEffectivePrice() { return effectivePrice; }
    public Integer getStockQuantity() { return stockQuantity; }
    public boolean isInStock() { return inStock; }
    public String getSku() { return sku; }
    public String getBadge() { return badge; }
    public Double getRating() { return rating; }
    public Integer getReviewCount() { return reviewCount; }
    public String getWarranty() { return warranty; }
    public Object getSpecifications() { return specifications; }
    public Object getFeatures() { return features; }
    public CategoryInfo getCategory() { return category; }
    public String getCreatedAt() { return createdAt; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private final ProductResponse r = new ProductResponse();
        public Builder id(Long v) { r.id = v; return this; }
        public Builder name(String v) { r.name = v; return this; }
        public Builder slug(String v) { r.slug = v; return this; }
        public Builder description(String v) { r.description = v; return this; }
        public Builder shortDescription(String v) { r.shortDescription = v; return this; }
        public Builder brand(String v) { r.brand = v; return this; }
        public Builder imageUrl(String v) { r.imageUrl = v; return this; }
        public Builder additionalImages(List<String> v) { r.additionalImages = v; return this; }
        public Builder price(BigDecimal v) { r.price = v; return this; }
        public Builder discountPrice(BigDecimal v) { r.discountPrice = v; return this; }
        public Builder effectivePrice(BigDecimal v) { r.effectivePrice = v; return this; }
        public Builder stockQuantity(Integer v) { r.stockQuantity = v; return this; }
        public Builder inStock(boolean v) { r.inStock = v; return this; }
        public Builder sku(String v) { r.sku = v; return this; }
        public Builder badge(String v) { r.badge = v; return this; }
        public Builder rating(Double v) { r.rating = v; return this; }
        public Builder reviewCount(Integer v) { r.reviewCount = v; return this; }
        public Builder warranty(String v) { r.warranty = v; return this; }
        public Builder specifications(Object v) { r.specifications = v; return this; }
        public Builder features(Object v) { r.features = v; return this; }
        public Builder category(CategoryInfo v) { r.category = v; return this; }
        public Builder createdAt(String v) { r.createdAt = v; return this; }
        public ProductResponse build() { return r; }
    }

    public static class CategoryInfo {
        private Long id;
        private String name, slug;
        public CategoryInfo() {}
        public Long getId() { return id; }
        public String getName() { return name; }
        public String getSlug() { return slug; }

        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private final CategoryInfo c = new CategoryInfo();
            public Builder id(Long v) { c.id = v; return this; }
            public Builder name(String v) { c.name = v; return this; }
            public Builder slug(String v) { c.slug = v; return this; }
            public CategoryInfo build() { return c; }
        }
    }
}
