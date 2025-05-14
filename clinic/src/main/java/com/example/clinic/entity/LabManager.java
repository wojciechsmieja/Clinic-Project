package com.example.clinic.entity;

import jakarta.persistence.*;

@Entity
@Table(name="kierownik_lab")
public class LabManager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_klab")
    private Long id;
    @Column(name="imie")
    private String imie;
    @Column(name="nazwisko")
    private String surname;
    @Column(name="id_prac")
    private Long idPrac;

    public LabManager(Long id, String imie, String surname, Long idPrac) {
        this.id = id;
        this.imie = imie;
        this.surname = surname;
        this.idPrac = idPrac;
    }

    public LabManager() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImie() {
        return imie;
    }

    public void setImie(String imie) {
        this.imie = imie;
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
