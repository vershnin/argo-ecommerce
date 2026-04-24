package com.argo.ecommerce.service.impl;

import com.argo.ecommerce.dto.request.CouponValidateRequest;
import com.argo.ecommerce.dto.response.CouponValidateResponse;
import com.argo.ecommerce.entity.Coupon;
import com.argo.ecommerce.repository.CouponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
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
}
