package com.argo.ecommerce.repository;

import com.argo.ecommerce.entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CouponRepository extends JpaRepository<Coupon, Long> {
    Optional<Coupon> findByCodeIgnoreCase(String code);
    boolean existsByCodeIgnoreCase(String code);

    @Query("SELECT c FROM Coupon c WHERE LOWER(c.code) = LOWER(:code)")
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<Coupon> findByCodeIgnoreCaseForUpdate(@Param("code") String code);
}
