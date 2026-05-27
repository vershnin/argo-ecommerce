package com.argo.ecommerce.dto.response;

public class AddressResponse {
    private Long id;
    private String label;
    private String fullName;
    private String phone;
    private String street;
    private String city;
    private String region;
    private Boolean isDefault;

    public AddressResponse() {}

    public Long getId() { return id; }
    public String getLabel() { return label; }
    public String getFullName() { return fullName; }
    public String getPhone() { return phone; }
    public String getStreet() { return street; }
    public String getCity() { return city; }
    public String getRegion() { return region; }
    public Boolean getIsDefault() { return isDefault; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private final AddressResponse a = new AddressResponse();
        public Builder id(Long v) { a.id = v; return this; }
        public Builder label(String v) { a.label = v; return this; }
        public Builder fullName(String v) { a.fullName = v; return this; }
        public Builder phone(String v) { a.phone = v; return this; }
        public Builder street(String v) { a.street = v; return this; }
        public Builder city(String v) { a.city = v; return this; }
        public Builder region(String v) { a.region = v; return this; }
        public Builder isDefault(Boolean v) { a.isDefault = v; return this; }
        public AddressResponse build() { return a; }
    }
}
