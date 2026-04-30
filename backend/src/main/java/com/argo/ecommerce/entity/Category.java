package com.argo.ecommerce.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.Formula;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categories")
public class Category {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false) private String name;
    @Column(unique = true, nullable = false) private String slug;
    private String description;
    private String iconName;

    @Formula("(select count(*) from products p where p.category_id = id)")
    private Long productCount;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    private List<Product> products = new ArrayList<>();

    public Category() {}
    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getIconName() { return iconName; }
    public void setIconName(String iconName) { this.iconName = iconName; }
    public Long getProductCount() { return productCount; }
    public List<Product> getProducts() { return products; }
}
