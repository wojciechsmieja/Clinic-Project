package com.example.clinic.entity;

import jakarta.persistence.*;

import java.util.Date;


@Entity
@Table(name="pracownicy")
public class Worker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_prac")
    private Integer id;
    @Column
    private String username;
    @Column
    private String password;
    @Column
    private String pesel;
    @Column
    private Date data_ur;
    @Column
    private String status;
    @Column
    private Integer id_lek;
    @Column
    private Integer id_rej;
    @Column
    private Integer id_lab;
    @Column
    private Integer id_klab;
    @Column
    private Boolean admin;

    public Worker(){}

    public Worker(String password, Integer id, String username, String pesel, Date data_ur, String status, Integer id_lek, Integer id_rej, Integer id_lab, Integer id_klab, Boolean admin) {
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


    public Integer getId() {
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

    public Date getData_ur() {
        return data_ur;
    }

    public String getStatus() {
        return status;
    }

    public Integer getId_lek() {
        return id_lek;
    }

    public Integer getId_rej() {
        return id_rej;
    }

    public Integer getId_lab() {
        return id_lab;
    }

    public Integer getId_klab() {
        return id_klab;
    }

    public Boolean getAdmin() {
        return admin;
    }

    public void setId(Integer id) {
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

    public void setData_ur(Date data_ur) {
        this.data_ur = data_ur;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setId_rej(Integer id_rej) {
        this.id_rej = id_rej;
    }

    public void setId_lek(Integer id_lek) {
        this.id_lek = id_lek;
    }

    public void setId_lab(Integer id_lab) {
        this.id_lab = id_lab;
    }

    public void setId_klab(Integer id_klab) {
        this.id_klab = id_klab;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }
}
