package com.argo.ecommerce.controller;

import com.argo.ecommerce.entity.Category;
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
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryRepository.findAll());
    }

    /**
     * GET /api/categories/{slug}
     */
    @GetMapping("/{slug}")
    public ResponseEntity<Category> getCategoryBySlug(@PathVariable String slug) {
        Category cat = categoryRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + slug));
        return ResponseEntity.ok(cat);
    }
}
