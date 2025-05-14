package com.example.clinic.entity;

import jakarta.persistence.*;

@Entity
@Table(name="laborant")
public class LabTech {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_lab")
    private Long id;
    @Column(name="imie")
    private String name;
    @Column(name="nazwisko")
    private String surname;
    @Column(name="id_prac")
    private Long idPrac;

    public LabTech() {}
    public LabTech(Long id, String name, String surname, Long idPrac) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.idPrac = idPrac;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getIdPrac() {
        return idPrac;
    }

    public void setIdPrac(Long idPrac) {
        this.idPrac = idPrac;
    }
}
