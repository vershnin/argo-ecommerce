package com.argo.ecommerce.dto.response;

public class ReviewResponse {
    private Long id, productId, userId;
    private String userName, title, comment, createdAt;
    private Integer rating, helpful;
    private Boolean verified;

    public ReviewResponse() {}
    public Long getId() { return id; }
    public Long getProductId() { return productId; }
    public Long getUserId() { return userId; }
    public String getUserName() { return userName; }
    public Integer getRating() { return rating; }
    public String getTitle() { return title; }
    public String getComment() { return comment; }
    public Boolean getVerified() { return verified; }
    public Integer getHelpful() { return helpful; }
    public String getCreatedAt() { return createdAt; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private final ReviewResponse r = new ReviewResponse();
        public Builder id(Long v) { r.id = v; return this; }
        public Builder productId(Long v) { r.productId = v; return this; }
        public Builder userId(Long v) { r.userId = v; return this; }
        public Builder userName(String v) { r.userName = v; return this; }
        public Builder rating(Integer v) { r.rating = v; return this; }
        public Builder title(String v) { r.title = v; return this; }
        public Builder comment(String v) { r.comment = v; return this; }
        public Builder verified(Boolean v) { r.verified = v; return this; }
        public Builder helpful(Integer v) { r.helpful = v; return this; }
        public Builder createdAt(String v) { r.createdAt = v; return this; }
        public ReviewResponse build() { return r; }
    }
}
