package com.argo.ecommerce.service.impl;

import com.argo.ecommerce.dto.request.AddressRequest;
import com.argo.ecommerce.entity.Address;
import com.argo.ecommerce.entity.User;
import com.argo.ecommerce.repository.AddressRepository;
import com.argo.ecommerce.repository.UserRepository;
import com.argo.ecommerce.service.AddressService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public AddressServiceImpl(AddressRepository addressRepository, UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Address> getByUsername(String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return addressRepository.findByUserIdOrderByIdDesc(user.getId());
    }

    @Override
    public Address createAddress(String username, AddressRequest request) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (Boolean.TRUE.equals(request.getIsDefault())) {
            user.getAddresses().forEach(address -> address.setIsDefault(false));
        }

        Address address = new Address();
        address.setUser(user);
        address.setLabel(request.getLabel());
        address.setFullName(request.getFullName());
        address.setPhone(request.getPhone());
        address.setStreet(request.getStreet());
        address.setCity(request.getCity());
        address.setRegion(request.getRegion());
        address.setIsDefault(request.getIsDefault());
        Address saved = addressRepository.save(address);

        if (Boolean.TRUE.equals(request.getIsDefault())) {
            user.getAddresses().add(saved);
        }

        return saved;
    }

    @Override
    public Address updateAddress(String username, Long addressId, AddressRequest request) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new IllegalArgumentException("Address not found"));

        if (!address.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Address does not belong to user");
        }

        if (Boolean.TRUE.equals(request.getIsDefault())) {
            user.getAddresses().forEach(addr -> addr.setIsDefault(false));
        }

        address.setLabel(request.getLabel());
        address.setFullName(request.getFullName());
        address.setPhone(request.getPhone());
        address.setStreet(request.getStreet());
        address.setCity(request.getCity());
        address.setRegion(request.getRegion());
        address.setIsDefault(request.getIsDefault());
        return addressRepository.save(address);
    }

    @Override
    public void deleteAddress(String username, Long addressId) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new IllegalArgumentException("Address not found"));

        if (!address.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Address does not belong to user");
        }

        addressRepository.delete(address);
    }
}
