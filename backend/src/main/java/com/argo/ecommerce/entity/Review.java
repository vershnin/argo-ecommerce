package com.argo.ecommerce.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
public class Review {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @Column(nullable = false) private Integer rating;
    @Column(nullable = false) private String title;
    @Column(columnDefinition = "TEXT", nullable = false) private String comment;
    private Boolean verified = false;
    private Integer helpful = 0;
    @CreationTimestamp private LocalDateTime createdAt;

    public Review() {}
    public Long getId() { return id; }
    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
    public Boolean getVerified() { return verified; }
    public void setVerified(Boolean verified) { this.verified = verified; }
    public Integer getHelpful() { return helpful; }
    public void setHelpful(Integer helpful) { this.helpful = helpful; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private final Review r = new Review();
        public Builder product(Product v) { r.product = v; return this; }
        public Builder user(User v) { r.user = v; return this; }
        public Builder rating(Integer v) { r.rating = v; return this; }
        public Builder title(String v) { r.title = v; return this; }
        public Builder comment(String v) { r.comment = v; return this; }
        public Builder helpful(Integer v) { r.helpful = v; return this; }
        public Review build() { return r; }
    }
}
