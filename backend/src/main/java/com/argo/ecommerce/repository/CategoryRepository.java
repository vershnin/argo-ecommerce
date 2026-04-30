package com.argo.ecommerce.repository;

import com.argo.ecommerce.dto.response.CategoryResponse;
import com.argo.ecommerce.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findBySlug(String slug);
    boolean existsByName(String name);

    @Query("SELECT new com.argo.ecommerce.dto.response.CategoryResponse(c.id, c.name, c.slug, c.description, c.iconName, COUNT(p)) " +
           "FROM Category c LEFT JOIN c.products p GROUP BY c.id, c.name, c.slug, c.description, c.iconName")
    List<CategoryResponse> findAllWithProductCount();

    @Query("SELECT new com.argo.ecommerce.dto.response.CategoryResponse(c.id, c.name, c.slug, c.description, c.iconName, COUNT(p)) " +
           "FROM Category c LEFT JOIN c.products p WHERE c.slug = :slug GROUP BY c.id, c.name, c.slug, c.description, c.iconName")
    Optional<CategoryResponse> findResponseBySlug(String slug);
}
