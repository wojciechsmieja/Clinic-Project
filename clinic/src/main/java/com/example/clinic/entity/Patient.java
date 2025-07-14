package com.example.clinic.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

@Entity
@Table(name="pacjent")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_pac",nullable = false)
    private Long id;

    @NotBlank
    @Size(max=32)
    @Column(name="imie",nullable = false)
    private String name;

    @NotBlank
    @Size(max=32)
    @Column(name="nazwisko", nullable=false)
    private String surname;

    @NotBlank
    @Pattern(regexp="\\d{11}")
    @Column(nullable=false, length = 11)
    private String pesel;

    @NotNull
    @Past(message = "Date of birth cannot be from future")
    @Column(name="data_ur", nullable = false)
    private LocalDate dateOfBirth;

    @Email
    @Size(max=32)
    @Column(name="email", length = 32)
    private String email;

    public Patient() {}
    public Patient(Long id, String name, String surname, String pesel, LocalDate dateOfBirth, String email) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.pesel = pesel;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getPesel() {
        return pesel;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public String getEmail() {
        return email;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public void setPesel(String pesel) {
        this.pesel = pesel;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
