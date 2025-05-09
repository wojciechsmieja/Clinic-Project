package com.example.clinic.entity;

import jakarta.persistence.*;

@Entity
@Table(name="pacjent")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_pac")
    private Long id;

    @Column(name="imie",nullable = false)
    private String name;

    @Column(name="nazwisko", nullable=false)
    private String surname;

    @Column(nullable=false)
    private String pesel;

    @Column(name="data_ur", nullable = false)
    private String dateOfBirth;

    @Column(name="email")
    private String email;

    public Patient() {}
    public Patient(Long id, String name, String surname, String pesel, String dateOfBirth, String email) {
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

    public String getDateOfBirth() {
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

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
