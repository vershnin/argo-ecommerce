package com.argo.ecommerce.dto.request;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public class ProductRequest {
    @NotBlank(message = "Product name is required") @Size(min = 2, max = 200)
    private String name;
    private String slug;
    @NotBlank(message = "Description is required")
    private String description;
    private String shortDescription;
    @NotBlank(message = "Brand is required")
    private String brand;
    @NotBlank(message = "Image URL is required")
    private String imageUrl;
    private String additionalImages;
    @NotNull(message = "Price is required") @DecimalMin(value = "0.01")
    private BigDecimal price;
    @DecimalMin(value = "0.01")
    private BigDecimal discountPrice;
    @NotNull(message = "Stock quantity is required") @Min(value = 0)
    private Integer stockQuantity;
    private String sku;
    private String badge;
    private String warranty;
    private String specifications;
    private String features;
    @NotNull(message = "Category ID is required")
    private Long categoryId;

    public ProductRequest() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getAdditionalImages() { return additionalImages; }
    public void setAdditionalImages(String additionalImages) { this.additionalImages = additionalImages; }
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
    public String getWarranty() { return warranty; }
    public void setWarranty(String warranty) { this.warranty = warranty; }
    public String getSpecifications() { return specifications; }
    public void setSpecifications(String specifications) { this.specifications = specifications; }
    public String getFeatures() { return features; }
    public void setFeatures(String features) { this.features = features; }
    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
}
