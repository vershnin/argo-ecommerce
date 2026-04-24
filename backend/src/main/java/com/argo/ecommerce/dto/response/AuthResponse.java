package com.argo.ecommerce.dto.response;

public class AuthResponse {
    private String token;
    private String tokenType = "Bearer";
    private UserDto user;

    public AuthResponse() {}
    public String getToken() { return token; }
    public String getTokenType() { return tokenType; }
    public UserDto getUser() { return user; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private final AuthResponse r = new AuthResponse();
        public Builder token(String v) { r.token = v; return this; }
        public Builder tokenType(String v) { r.tokenType = v; return this; }
        public Builder user(UserDto v) { r.user = v; return this; }
        public AuthResponse build() { return r; }
    }

    public static class UserDto {
        private Long id;
        private String fullName, email, phone, avatarUrl, role, createdAt;
        public UserDto() {}
        public Long getId() { return id; }
        public String getFullName() { return fullName; }
        public String getEmail() { return email; }
        public String getPhone() { return phone; }
        public String getAvatarUrl() { return avatarUrl; }
        public String getRole() { return role; }
        public String getCreatedAt() { return createdAt; }

        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private final UserDto d = new UserDto();
            public Builder id(Long v) { d.id = v; return this; }
            public Builder fullName(String v) { d.fullName = v; return this; }
            public Builder email(String v) { d.email = v; return this; }
            public Builder phone(String v) { d.phone = v; return this; }
            public Builder avatarUrl(String v) { d.avatarUrl = v; return this; }
            public Builder role(String v) { d.role = v; return this; }
            public Builder createdAt(String v) { d.createdAt = v; return this; }
            public UserDto build() { return d; }
        }
    }
}
