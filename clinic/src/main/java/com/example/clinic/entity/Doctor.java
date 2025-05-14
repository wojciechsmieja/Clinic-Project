package com.example.clinic.entity;

import jakarta.persistence.*;

@Entity
@Table(name="lekarz")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_lek")
    private Long id;
    @Column(name="imie")
    private String name;
    @Column(name="nazwisko")
    private String surname;
    @Column
    private Integer npwz;
    @Column(name="id_prac")
    private Long idPrac;

    public Doctor() {  }
    public Doctor(Long id, String name, Integer npwz ,String surname, Long idPrac) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.npwz = npwz;
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

    public Integer getNpwz() {
        return npwz;
    }

    public void setNpwz(Integer npwz) {
        this.npwz = npwz;
    }

    public Long getIdPrac() {
        return idPrac;
    }

    public void setIdPrac(Long idPrac) {
        this.idPrac = idPrac;
    }
}
