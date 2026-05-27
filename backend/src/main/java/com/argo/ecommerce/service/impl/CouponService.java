package com.argo.ecommerce.service.impl;

import com.argo.ecommerce.dto.request.CouponRequest;
import com.argo.ecommerce.dto.request.CouponValidateRequest;
import com.argo.ecommerce.dto.response.CouponResponse;
import com.argo.ecommerce.dto.response.CouponValidateResponse;
import com.argo.ecommerce.entity.Coupon;
import com.argo.ecommerce.exception.ConflictException;
import com.argo.ecommerce.exception.ResourceNotFoundException;
import com.argo.ecommerce.repository.CouponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CouponService {

    private final CouponRepository couponRepository;

    @Transactional(readOnly = true)
    public CouponValidateResponse validate(CouponValidateRequest request) {
        Optional<Coupon> opt = couponRepository.findByCodeIgnoreCase(request.getCode());

        if (opt.isEmpty()) {
            return CouponValidateResponse.builder()
                    .valid(false).message("Invalid promo code").build();
        }

        Coupon coupon = opt.get();

        if (!coupon.isValid(request.getOrderTotal())) {
            String reason = !coupon.getActive()
                    ? "This promo code has expired"
                    : coupon.getMinOrderAmount() != null &&
                      request.getOrderTotal().compareTo(coupon.getMinOrderAmount()) < 0
                        ? "Minimum order of KSH " + coupon.getMinOrderAmount() + " required"
                        : "This promo code is no longer available";

            return CouponValidateResponse.builder()
                    .valid(false).message(reason).build();
        }

        BigDecimal discount = coupon.calculateDiscount(request.getOrderTotal());

        return CouponValidateResponse.builder()
                .valid(true)
                .code(coupon.getCode())
                .type(coupon.getType().name())
                .value(coupon.getValue())
                .discount(discount)
                .build();
    }

    @Transactional(readOnly = true)
    public List<CouponResponse> listCoupons() {
        return couponRepository.findAll(Sort.by(Sort.Direction.ASC, "code")).stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public CouponResponse createCoupon(CouponRequest request) {
        if (couponRepository.existsByCodeIgnoreCase(request.getCode())) {
            throw new ConflictException("Promo code already exists: " + request.getCode());
        }

        Coupon coupon = new Coupon();
        coupon.setCode(request.getCode().trim());
        coupon.setType(Coupon.CouponType.valueOf(request.getType().toUpperCase()));
        coupon.setValue(new BigDecimal(request.getValue()));
        coupon.setMinOrderAmount(request.getMinOrderAmount() != null && !request.getMinOrderAmount().isBlank()
                ? new BigDecimal(request.getMinOrderAmount()) : null);
        coupon.setExpiresAt(request.getExpiresAt() != null && !request.getExpiresAt().isBlank()
                ? LocalDate.parse(request.getExpiresAt()) : null);
        coupon.setActive(request.getActive() == null || request.getActive());
        couponRepository.save(coupon);
        return toResponse(coupon);
    }

    @Transactional
    public CouponResponse updateCoupon(Long id, CouponRequest request) {
        Coupon coupon = couponRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Promo code not found: " + id));

        coupon.setCode(request.getCode().trim());
        coupon.setType(Coupon.CouponType.valueOf(request.getType().toUpperCase()));
        coupon.setValue(new BigDecimal(request.getValue()));
        coupon.setMinOrderAmount(request.getMinOrderAmount() != null && !request.getMinOrderAmount().isBlank()
                ? new BigDecimal(request.getMinOrderAmount()) : null);
        coupon.setExpiresAt(request.getExpiresAt() != null && !request.getExpiresAt().isBlank()
                ? LocalDate.parse(request.getExpiresAt()) : null);
        coupon.setActive(request.getActive() == null || request.getActive());
        couponRepository.save(coupon);
        return toResponse(coupon);
    }

    @Transactional
    public void deleteCoupon(Long id) {
        if (!couponRepository.existsById(id)) {
            throw new ResourceNotFoundException("Promo code not found: " + id);
        }
        couponRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public long countActivePromotions() {
        return couponRepository.countByActiveTrue();
    }

    private CouponResponse toResponse(Coupon coupon) {
        return CouponResponse.builder()
                .id(coupon.getId())
                .code(coupon.getCode())
                .type(coupon.getType().name().toLowerCase())
                .value(coupon.getValue())
                .minOrderAmount(coupon.getMinOrderAmount())
                .expiresAt(coupon.getExpiresAt() != null ? coupon.getExpiresAt().toString() : null)
                .active(coupon.getActive())
                .usageLimit(coupon.getUsageLimit())
                .usageCount(coupon.getUsageCount())
                .build();
    }
}
