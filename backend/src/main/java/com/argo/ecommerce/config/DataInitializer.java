package com.argo.ecommerce.config;

import com.argo.ecommerce.entity.Category;
import com.argo.ecommerce.entity.Coupon;
import com.argo.ecommerce.entity.Product;
import com.argo.ecommerce.entity.Role;
import com.argo.ecommerce.entity.User;
import com.argo.ecommerce.repository.CategoryRepository;
import com.argo.ecommerce.repository.CouponRepository;
import com.argo.ecommerce.repository.ProductRepository;
import com.argo.ecommerce.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CouponRepository couponRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(
            CategoryRepository categoryRepository,
            ProductRepository productRepository,
            UserRepository userRepository,
            CouponRepository couponRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.couponRepository = couponRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        seedCategories();
        seedUsers();
        seedCoupons();
        seedProducts();
    }

    private void seedCategories() {
        if (categoryRepository.count() > 0) return;
        categoryRepository.saveAll(List.of(
                createCategory("Audio", "audio", "Headphones", "Premium audio devices and accessories for immersive listening."),
                createCategory("Gaming", "gaming", "GameController", "Keyboards, mice, headsets and accessories for every gamer."),
                createCategory("Computing", "computing", "Laptop", "High-performance laptops, desktops, and computer hardware."),
                createCategory("Wearables", "wearables", "Watch", "Smartwatches, fitness trackers, and wearable tech.")
        ));
    }

    private void seedUsers() {
        // Always ensure admin@argo.com is an ADMIN
        userRepository.findByEmail("admin@argo.com").ifPresentOrElse(
                user -> {
                    if (user.getRole() != Role.ADMIN) {
                        user.setRole(Role.ADMIN);
                        userRepository.save(user);
                    }
                },
                () -> {
                    User admin = User.builder()
                            .fullName("Argo Admin")
                            .email("admin@argo.com")
                            .password(passwordEncoder.encode("Admin123!"))
                            .role(Role.ADMIN)
                            .build();
                    userRepository.save(admin);
                }
        );

        if (!userRepository.existsByEmail("customer@argo.com")) {
            User customer = User.builder()
                    .fullName("Demo Customer")
                    .email("customer@argo.com")
                    .password(passwordEncoder.encode("Customer123!"))
                    .role(Role.CUSTOMER)
                    .build();
            userRepository.save(customer);
        }
    }

    private void seedCoupons() {
        if (couponRepository.count() > 0) return;
        couponRepository.saveAll(List.of(
                createCoupon("WELCOME10", Coupon.CouponType.PERCENTAGE, BigDecimal.valueOf(10), BigDecimal.valueOf(50), LocalDate.now().plusMonths(2), 500),
                createCoupon("SAVE50", Coupon.CouponType.FIXED, BigDecimal.valueOf(50), BigDecimal.valueOf(150), LocalDate.now().plusMonths(3), 250)
        ));
    }

    private void seedProducts() {
        if (productRepository.count() > 0) return;
        Category audio = categoryRepository.findBySlug("audio").orElseThrow();
        Category gaming = categoryRepository.findBySlug("gaming").orElseThrow();
        Category computing = categoryRepository.findBySlug("computing").orElseThrow();
        Category wearables = categoryRepository.findBySlug("wearables").orElseThrow();

        productRepository.saveAll(List.of(
                Product.builder()
                        .name("Argon Nova Wireless Headphones")
                        .slug("argon-nova-wireless-headphones")
                        .description("Experience rich sound, active noise cancellation, and up to 28 hours of battery life.")
                        .shortDescription("Premium wireless headphones for immersive audio on the go.")
                        .brand("Argon Audio")
                        .imageUrl("https://via.placeholder.com/640x480.png?text=Argon+Nova+Headphones")
                        .additionalImages("https://via.placeholder.com/640x480.png?text=Argon+Nova+Side,https://via.placeholder.com/640x480.png?text=Argon+Nova+Case")
                        .price(BigDecimal.valueOf(199.99))
                        .discountPrice(BigDecimal.valueOf(169.99))
                        .stockQuantity(24)
                        .sku("ARGO-AH-001")
                        .badge("Best Seller")
                        .rating(4.8)
                        .reviewCount(92)
                        .warranty("2-year limited warranty")
                        .specifications("Bluetooth 5.2; Active Noise Cancellation; 28h battery; 40mm drivers; built-in microphone")
                        .features("Comfortable memory foam earcups; fast charging; multi-device pairing; foldable design")
                        .category(audio)
                        .build(),
                Product.builder()
                        .name("Pulse G9 Mechanical Gaming Keyboard")
                        .slug("pulse-g9-mechanical-gaming-keyboard")
                        .description("Responsive mechanical switches and customizable RGB lighting for every gaming setup.")
                        .shortDescription("High-performance mechanical keyboard built for competitive play.")
                        .brand("Argon Gaming")
                        .imageUrl("https://via.placeholder.com/640x480.png?text=Pulse+G9+Keyboard")
                        .additionalImages("https://via.placeholder.com/640x480.png?text=Pulse+G9+Side,https://via.placeholder.com/640x480.png?text=Pulse+G9+Keys")
                        .price(BigDecimal.valueOf(149.99))
                        .discountPrice(BigDecimal.valueOf(129.99))
                        .stockQuantity(18)
                        .sku("ARGO-GK-009")
                        .badge("New")
                        .rating(4.6)
                        .reviewCount(38)
                        .warranty("1-year hardware warranty")
                        .specifications("Cherry MX-style switches; USB-C connection; full N-key rollover; dedicated media keys")
                        .features("RGB lighting presets; detachable wrist rest; durable aluminum frame")
                        .category(gaming)
                        .build(),
                Product.builder()
                        .name("Orbit 15 Ultralight Laptop")
                        .slug("orbit-15-ultralight-laptop")
                        .description("Thin, powerful laptop designed for productivity and travel with long battery life.")
                        .shortDescription("Lightweight 15-inch laptop with high-performance components.")
                        .brand("Argon Compute")
                        .imageUrl("https://via.placeholder.com/640x480.png?text=Orbit+15+Laptop")
                        .additionalImages("https://via.placeholder.com/640x480.png?text=Orbit+15+Keyboard,https://via.placeholder.com/640x480.png?text=Orbit+15+Back")
                        .price(BigDecimal.valueOf(999.99))
                        .discountPrice(BigDecimal.valueOf(899.99))
                        .stockQuantity(12)
                        .sku("ARGO-LT-015")
                        .badge("Featured")
                        .rating(4.7)
                        .reviewCount(55)
                        .warranty("2-year limited warranty")
                        .specifications("15.6-inch FHD display; Intel i7; 16GB RAM; 512GB SSD; Wi-Fi 6")
                        .features("Nano-edge display; fingerprint reader; ultra-thin chassis")
                        .category(computing)
                        .build(),
                Product.builder()
                        .name("Vibe Pro Smartwatch")
                        .slug("vibe-pro-smartwatch")
                        .description("Smartwatch with fitness tracking, sleep monitoring, and mobile notifications.")
                        .shortDescription("Sleek wearable for health tracking and daily convenience.")
                        .brand("Argon Wear")
                        .imageUrl("https://via.placeholder.com/640x480.png?text=Vibe+Pro+Smartwatch")
                        .additionalImages("https://via.placeholder.com/640x480.png?text=Vibe+Pro+Watch,https://via.placeholder.com/640x480.png?text=Vibe+Pro+Strap")
                        .price(BigDecimal.valueOf(229.99))
                        .discountPrice(BigDecimal.valueOf(199.99))
                        .stockQuantity(20)
                        .sku("ARGO-SW-007")
                        .badge("Trending")
                        .rating(4.5)
                        .reviewCount(61)
                        .warranty("1-year limited warranty")
                        .specifications("1.4-inch AMOLED display; GPS; heart rate monitor; water-resistant")
                        .features("Sleep tracking; voice assistant support; custom watch faces")
                        .category(wearables)
                        .build()
        ));
    }

    private Category createCategory(String name, String slug, String iconName, String description) {
        Category category = new Category();
        category.setName(name);
        category.setSlug(slug);
        category.setIconName(iconName);
        category.setDescription(description);
        return category;
    }

    private Coupon createCoupon(String code, Coupon.CouponType type, BigDecimal value, BigDecimal minOrderAmount, LocalDate expiresAt, int usageLimit) {
        Coupon coupon = new Coupon();
        coupon.setCode(code);
        coupon.setType(type);
        coupon.setValue(value);
        coupon.setMinOrderAmount(minOrderAmount);
        coupon.setExpiresAt(expiresAt);
        coupon.setUsageLimit(usageLimit);
        coupon.setActive(true);
        return coupon;
    }
}
