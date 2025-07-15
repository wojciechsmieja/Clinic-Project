package com.example.clinic.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.Date;


@Entity
@Table(name="pracownicy")
public class Worker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_prac")
    private Long id;
    @NotNull
    @Size(max=32)
    @Column
    private String username;
    @Column
    private String password;
    @Column
    private String pesel;
    @Column
    private LocalDate data_ur;
    @Column
    private String status;
    @Column
    private Long id_lek;
    @Column
    private Long id_rej;
    @Column
    private Long id_lab;
    @Column
    private Long id_klab;
    @Column
    private Boolean admin;

    public Worker(){}

    public Worker(String password, Long id, String username, String pesel, LocalDate data_ur, String status, Long id_lek, Long id_rej, Long id_lab, Long id_klab, Boolean admin) {
        this.password = password;
        this.id = id;
        this.username = username;
        this.pesel = pesel;
        this.data_ur = data_ur;
        this.status = status;
        this.id_lek = id_lek;
        this.id_rej = id_rej;
        this.id_lab = id_lab;
        this.id_klab = id_klab;
        this.admin = admin;
    }


    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getPesel() {
        return pesel;
    }

    public LocalDate getData_ur() {
        return data_ur;
    }

    public String getStatus() {
        return status;
    }

    public Long getId_lek() {
        return id_lek;
    }

    public Long getId_rej() {
        return id_rej;
    }

    public Long getId_lab() {
        return id_lab;
    }

    public Long getId_klab() {
        return id_klab;
    }

    public Boolean getAdmin() {
        return admin;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setPesel(String pesel) {
        this.pesel = pesel;
    }

    public void setData_ur(LocalDate data_ur) {
        this.data_ur = data_ur;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setId_rej(Long id_rej) {
        this.id_rej = id_rej;
    }

    public void setId_lek(Long id_lek) {
        this.id_lek = id_lek;
    }

    public void setId_lab(Long id_lab) {
        this.id_lab = id_lab;
    }

    public void setId_klab(Long id_klab) {
        this.id_klab = id_klab;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }
}
