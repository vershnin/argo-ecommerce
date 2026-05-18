package com.argo.ecommerce.service.impl;

import com.argo.ecommerce.dto.request.ReviewRequest;
import com.argo.ecommerce.dto.response.ReviewResponse;
import com.argo.ecommerce.entity.Product;
import com.argo.ecommerce.entity.Review;
import com.argo.ecommerce.entity.User;
import com.argo.ecommerce.repository.ProductRepository;
import com.argo.ecommerce.repository.ReviewRepository;
import com.argo.ecommerce.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReviewServiceTest {

    @Mock
    private ReviewRepository reviewRepository;
    @Mock
    private ProductRepository productRepository;
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ReviewService reviewService;

    private Long productId = 1L;
    private Long userId = 2L;
    private ReviewRequest reviewRequest;
    private User user;
    private Product product;

    @BeforeEach
    void setUp() {
        reviewRequest = new ReviewRequest();
        reviewRequest.setRating(5);
        reviewRequest.setTitle("Great");
        reviewRequest.setComment("Really good product");

        user = User.builder()
                .id(userId)
                .fullName("John Doe")
                .build();

        product = Product.builder()
                .name("Test Product")
                .build();
        product.setId(productId);
    }

    @Test
    void submitReview_ShouldFetchFullUserAndReturnUserName() {
        // Arrange
        when(reviewRepository.findByProductIdAndUserId(productId, userId)).thenReturn(Optional.empty());
        when(productRepository.findById(productId)).thenReturn(Optional.of(product));
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        
        when(reviewRepository.save(any(Review.class))).thenAnswer(invocation -> {
            Review r = invocation.getArgument(0);
            // Simulate DB setting ID
            java.lang.reflect.Field field = Review.class.getDeclaredField("id");
            field.setAccessible(true);
            field.set(r, 100L);
            return r;
        });

        // Act
        ReviewResponse response = reviewService.submitReview(productId, userId, reviewRequest);

        // Assert
        assertNotNull(response);
        assertEquals("John Doe", response.getUserName());
        assertEquals(userId, response.getUserId());
        
        verify(userRepository).findById(userId);
        verify(reviewRepository).save(argThat(review -> 
            review.getUser().getFullName().equals("John Doe")
        ));
    }
}
