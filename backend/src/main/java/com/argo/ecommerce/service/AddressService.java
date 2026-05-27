package com.argo.ecommerce.service;

import com.argo.ecommerce.dto.request.AddressRequest;
import com.argo.ecommerce.entity.Address;

import java.util.List;

public interface AddressService {
    List<Address> getByUsername(String username);
    Address createAddress(String username, AddressRequest request);
    Address updateAddress(String username, Long addressId, AddressRequest request);
    void deleteAddress(String username, Long addressId);
}
