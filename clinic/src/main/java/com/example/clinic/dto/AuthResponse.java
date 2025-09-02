package com.example.clinic.dto;

public class AuthResponse {
    private String token;
    private String role;
    private Long id_prac;

    public AuthResponse() {}

    public AuthResponse(String token, String role, Long id_prac) {
        this.token = token;
        this.role = role;
        this.id_prac = id_prac;
    }

    public Long getId_prac() {
        return id_prac;
    }

    public void setId_prac(Long id_prac) {
        this.id_prac = id_prac;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
