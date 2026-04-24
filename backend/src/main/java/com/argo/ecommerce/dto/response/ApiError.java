package com.argo.ecommerce.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiError {
    private int status;
    private String error, message, path;
    private LocalDateTime timestamp;
    private Map<String, String> fieldErrors;

    public ApiError() {}
    public int getStatus() { return status; }
    public String getError() { return error; }
    public String getMessage() { return message; }
    public String getPath() { return path; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public Map<String, String> getFieldErrors() { return fieldErrors; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private final ApiError r = new ApiError();
        public Builder status(int v) { r.status = v; return this; }
        public Builder error(String v) { r.error = v; return this; }
        public Builder message(String v) { r.message = v; return this; }
        public Builder path(String v) { r.path = v; return this; }
        public Builder timestamp(LocalDateTime v) { r.timestamp = v; return this; }
        public Builder fieldErrors(Map<String, String> v) { r.fieldErrors = v; return this; }
        public ApiError build() { return r; }
    }
}
