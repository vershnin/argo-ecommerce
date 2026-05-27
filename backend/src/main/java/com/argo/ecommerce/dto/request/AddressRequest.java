package com.argo.ecommerce.dto.request;

import jakarta.validation.constraints.NotBlank;

public class AddressRequest {

    @NotBlank private String label;
    @NotBlank private String fullName;
    @NotBlank private String phone;
    @NotBlank private String street;
    @NotBlank private String city;
    @NotBlank private String region;
    private Boolean isDefault = false;

    public AddressRequest() {}

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getStreet() { return street; }
    public void setStreet(String street) { this.street = street; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }
    public Boolean getIsDefault() { return isDefault; }
    public void setIsDefault(Boolean isDefault) { this.isDefault = isDefault; }
}
