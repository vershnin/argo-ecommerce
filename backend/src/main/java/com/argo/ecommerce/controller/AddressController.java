package com.argo.ecommerce.controller;

import com.argo.ecommerce.dto.request.AddressRequest;
import com.argo.ecommerce.dto.response.AddressResponse;
import com.argo.ecommerce.entity.Address;
import com.argo.ecommerce.service.AddressService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping
    public ResponseEntity<List<AddressResponse>> getAddresses(@AuthenticationPrincipal UserDetails userDetails) {
        List<Address> addresses = addressService.getByUsername(userDetails.getUsername());
        List<AddressResponse> response = addresses.stream().map(this::toResponse).collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<AddressResponse> createAddress(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody AddressRequest request) {
        Address saved = addressService.createAddress(userDetails.getUsername(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(saved));
    }

    @PutMapping("/{addressId}")
    public ResponseEntity<AddressResponse> updateAddress(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long addressId,
            @Valid @RequestBody AddressRequest request) {
        Address updated = addressService.updateAddress(userDetails.getUsername(), addressId, request);
        return ResponseEntity.ok(toResponse(updated));
    }

    @DeleteMapping("/{addressId}")
    public ResponseEntity<Void> deleteAddress(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long addressId) {
        addressService.deleteAddress(userDetails.getUsername(), addressId);
        return ResponseEntity.noContent().build();
    }

    private AddressResponse toResponse(Address address) {
        return AddressResponse.builder()
                .id(address.getId())
                .label(address.getLabel())
                .fullName(address.getFullName())
                .phone(address.getPhone())
                .street(address.getStreet())
                .city(address.getCity())
                .region(address.getRegion())
                .isDefault(address.getIsDefault())
                .build();
    }
}
