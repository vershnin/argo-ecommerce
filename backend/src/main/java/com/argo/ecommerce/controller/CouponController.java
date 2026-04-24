package com.argo.ecommerce.controller;

import com.argo.ecommerce.dto.request.CouponValidateRequest;
import com.argo.ecommerce.dto.response.CouponValidateResponse;
import com.argo.ecommerce.service.impl.CouponService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/coupons")
@RequiredArgsConstructor
public class CouponController {

    private final CouponService couponService;

    /**
     * POST /api/coupons/validate
     * Body: { code, orderTotal }
     */
    @PostMapping("/validate")
    public ResponseEntity<CouponValidateResponse> validate(
            @Valid @RequestBody CouponValidateRequest request) {
        return ResponseEntity.ok(couponService.validate(request));
    }
}
