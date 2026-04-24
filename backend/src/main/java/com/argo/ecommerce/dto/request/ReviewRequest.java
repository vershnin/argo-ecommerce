package com.argo.ecommerce.dto.request;

import jakarta.validation.constraints.*;

public class ReviewRequest {
    @NotNull @Min(1) @Max(5) private Integer rating;
    @NotBlank @Size(min = 3, max = 100) private String title;
    @NotBlank @Size(min = 10, max = 2000) private String comment;

    public ReviewRequest() {}
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
}
