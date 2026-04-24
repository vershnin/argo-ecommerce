package com.argo.ecommerce.dto.request;

import jakarta.validation.constraints.*;

public class AuthRequest {

    public static class Register {
        @NotBlank(message = "Full name is required") @Size(min = 2, max = 100)
        private String fullName;
        @NotBlank(message = "Email is required") @Email
        private String email;
        @NotBlank(message = "Password is required") @Size(min = 8)
        private String password;
        private String phone;

        public Register() {}
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
    }

    public static class Login {
        @NotBlank @Email private String email;
        @NotBlank private String password;

        public Login() {}
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
