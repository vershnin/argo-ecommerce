package com.argo.ecommerce.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Entity
@Table(name = "products", indexes = {
        @Index(name = "idx_products_brand", columnList = "brand"),
        @Index(name = "idx_products_category_price", columnList = "category_id, price")
})
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String shortDescription;

    private String brand;

    @Column(nullable = false)
    private String imageUrl;

    @Deprecated
    @Column(columnDefinition = "TEXT")
    private String additionalImages;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductImage> productImages = new ArrayList<>();

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Column(precision = 12, scale = 2)
    private BigDecimal discountPrice;

    @Column(nullable = false)
    private Integer stockQuantity = 0;

    private String sku;
    private String badge;
    private Double rating = 0.0;
    private Integer reviewCount = 0;
    private String warranty;

    @Column(columnDefinition = "TEXT")
    private String specifications;

    @Column(columnDefinition = "TEXT")
    private String features;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CartItem> cartItems = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public Product() {}

    public boolean isInStock() {
        return stockQuantity != null && stockQuantity > 0;
    }

    public BigDecimal getEffectivePrice() {
        return (discountPrice != null) ? discountPrice : price;
    }

    // ── Getters & Setters ──────────────────────────────────────
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String s) { this.shortDescription = s; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    @Deprecated
    public String getAdditionalImages() { return additionalImages; }
    @Deprecated
    public void setAdditionalImages(String additionalImages) { this.additionalImages = additionalImages; }
    public List<ProductImage> getProductImages() { return productImages; }
    public void setProductImages(List<ProductImage> productImages) { this.productImages = productImages; }

    public List<String> getAdditionalImageUrls() {
        if (productImages != null && !productImages.isEmpty()) {
            return productImages.stream().map(ProductImage::getUrl).toList();
        }
        if (additionalImages == null || additionalImages.isBlank()) {
            return Collections.emptyList();
        }
        return Arrays.stream(additionalImages.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
    }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public BigDecimal getDiscountPrice() { return discountPrice; }
    public void setDiscountPrice(BigDecimal discountPrice) { this.discountPrice = discountPrice; }
    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }
    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }
    public String getWarranty() { return warranty; }
    public void setWarranty(String warranty) { this.warranty = warranty; }
    public String getSpecifications() { return specifications; }
    public void setSpecifications(String specifications) { this.specifications = specifications; }
    public String getFeatures() { return features; }
    public void setFeatures(String features) { this.features = features; }
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
    public List<Review> getReviews() { return reviews; }
    public List<CartItem> getCartItems() { return cartItems; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    // ── Builder ────────────────────────────────────────────────
    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final Product p = new Product();
        public Builder name(String v) { p.name = v; return this; }
        public Builder slug(String v) { p.slug = v; return this; }
        public Builder description(String v) { p.description = v; return this; }
        public Builder shortDescription(String v) { p.shortDescription = v; return this; }
        public Builder brand(String v) { p.brand = v; return this; }
        public Builder imageUrl(String v) { p.imageUrl = v; return this; }
        public Builder additionalImages(String v) { p.additionalImages = v; return this; }
        public Builder price(BigDecimal v) { p.price = v; return this; }
        public Builder discountPrice(BigDecimal v) { p.discountPrice = v; return this; }
        public Builder stockQuantity(Integer v) { p.stockQuantity = v; return this; }
        public Builder sku(String v) { p.sku = v; return this; }
        public Builder badge(String v) { p.badge = v; return this; }
        public Builder rating(Double v) { p.rating = v; return this; }
        public Builder reviewCount(Integer v) { p.reviewCount = v; return this; }
        public Builder warranty(String v) { p.warranty = v; return this; }
        public Builder specifications(String v) { p.specifications = v; return this; }
        public Builder features(String v) { p.features = v; return this; }
        public Builder category(Category v) { p.category = v; return this; }
        public Product build() { return p; }
    }
}
