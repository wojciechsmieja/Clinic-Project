package com.example.clinic.dto;

import java.time.LocalDate;

public class EmployeeDTO {
    private Long id;
    private String username;
    private String pesel;
    private LocalDate dateOfBirth;
    private String status;
    private String role;
    private boolean admin;
    private String name;
    private String surname;
    //private Long id_role;

    public EmployeeDTO() {}

    public EmployeeDTO(Long id, String username, String pesel, LocalDate dateOfBirth, String status, String rola, boolean admin, String name, String surname) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.pesel = pesel;
        this.dateOfBirth = dateOfBirth;
        this.status = status;
        this.role = rola;
        this.admin = admin;
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPesel() {
        return pesel;
    }

    public void setPesel(String pesel) {
        this.pesel = pesel;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String rola) {
        this.role = rola;
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }
}
