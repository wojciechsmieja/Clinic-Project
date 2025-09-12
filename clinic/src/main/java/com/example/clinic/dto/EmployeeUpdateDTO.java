package com.example.clinic.dto;

import java.time.LocalDate;

public class EmployeeUpdateDTO {
    private String name;
    private String surname;
    private LocalDate dateOfBirth;
    private String status;

    public EmployeeUpdateDTO() {}

    public EmployeeUpdateDTO(String name, String surname, LocalDate dateOfBirth, String status) {
        this.name = name;
        this.surname = surname;
        this.dateOfBirth = dateOfBirth;
        this.status = status;
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
}

