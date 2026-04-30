package com.argo.ecommerce.controller;

import com.argo.ecommerce.dto.response.CategoryResponse;
import com.argo.ecommerce.exception.ResourceNotFoundException;
import com.argo.ecommerce.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryRepository categoryRepository;

    /**
     * GET /api/categories
     */
    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        return ResponseEntity.ok(categoryRepository.findAllWithProductCount());
    }

    /**
     * GET /api/categories/{slug}
     */
    @GetMapping("/{slug}")
    public ResponseEntity<CategoryResponse> getCategoryBySlug(@PathVariable String slug) {
        CategoryResponse cat = categoryRepository.findResponseBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + slug));
        return ResponseEntity.ok(cat);
    }
}
