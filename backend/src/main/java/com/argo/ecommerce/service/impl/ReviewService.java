package com.argo.ecommerce.service.impl;

import com.argo.ecommerce.dto.request.ReviewRequest;
import com.argo.ecommerce.dto.response.PageResponse;
import com.argo.ecommerce.dto.response.ReviewResponse;
import com.argo.ecommerce.entity.Product;
import com.argo.ecommerce.entity.Review;
import com.argo.ecommerce.entity.User;
import com.argo.ecommerce.exception.BadRequestException;
import com.argo.ecommerce.exception.ResourceNotFoundException;
import com.argo.ecommerce.repository.ProductRepository;
import com.argo.ecommerce.repository.ReviewRepository;
import com.argo.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public PageResponse<ReviewResponse> getProductReviews(Long productId, int page, int size) {
        Page<Review> reviews = reviewRepository.findByProductIdOrderByCreatedAtDesc(
                productId, PageRequest.of(page, size));
        return PageResponse.<ReviewResponse>builder()
                .content(reviews.getContent().stream().map(this::toResponse).toList())
                .page(reviews.getNumber())
                .size(reviews.getSize())
                .totalElements(reviews.getTotalElements())
                .totalPages(reviews.getTotalPages())
                .last(reviews.isLast())
                .first(reviews.isFirst())
                .build();
    }

    @Transactional
    public ReviewResponse submitReview(Long productId, Long userId, ReviewRequest request) {
        // One review per user per product
        if (reviewRepository.findByProductIdAndUserId(productId, userId).isPresent()) {
            throw new BadRequestException("You have already reviewed this product");
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + productId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));

        Review review = Review.builder()
                .product(product)
                .user(user)
                .rating(request.getRating())
                .title(request.getTitle())
                .comment(request.getComment())
                .helpful(0)
                .build();

        Review saved = reviewRepository.save(review);

        // Update product aggregate rating
        Double avg = reviewRepository.calculateAverageRating(productId);
        long count = reviewRepository.countByProductId(productId);
        product.setRating(avg != null ? Math.round(avg * 10.0) / 10.0 : 0.0);
        product.setReviewCount((int) count);
        productRepository.save(product);

        return toResponse(saved);
    }

    private ReviewResponse toResponse(Review r) {
        return ReviewResponse.builder()
                .id(r.getId())
                .productId(r.getProduct().getId())
                .userId(r.getUser().getId())
                .userName(r.getUser().getFullName())
                .rating(r.getRating())
                .title(r.getTitle())
                .comment(r.getComment())
                .verified(r.getVerified())
                .helpful(r.getHelpful())
                .createdAt(r.getCreatedAt() != null ? r.getCreatedAt().toString() : null)
                .build();
    }
}
