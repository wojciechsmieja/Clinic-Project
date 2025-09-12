package com.example.clinic.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name="pracownicy")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_prac", nullable = false)
    private Long id_prac;

    @Column(length = 32,nullable = false)
    private String username;

    @Column(length = 255,nullable = false)
    private String password;

    @Column(length = 11,nullable = false)
    private String pesel;

    @Column(name="data_ur",nullable = false)
    private LocalDate data_ur;

    @Column(length = 16,nullable = false)
    private String status;

    @Column(length = 30, nullable = false)
    private String rola;

    @Column(nullable = false)
    private boolean admin;

    public Employee() {}

    public Employee(Long id_prac, String username, String pesel, String password, LocalDate data_ur, String status, boolean admin, String rola) {
        this.id_prac = id_prac;
        this.username = username;
        this.pesel = pesel;
        this.password = password;
        this.data_ur = data_ur;
        this.rola = rola;
        this.admin = admin;
    }

    public Long getId_prac() {
        return id_prac;
    }

    public void setId_prac(Long id_prac) {
        this.id_prac = id_prac;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDate getData_ur() {
        return data_ur;
    }

    public void setData_ur(LocalDate data_ur) {
        this.data_ur = data_ur;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPesel() {
        return pesel;
    }

    public void setPesel(String pesel) {
        this.pesel = pesel;
    }

    public String getRola() {
        return rola;
    }

    public void setRola(String rola) {
        this.rola = rola;
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

}
