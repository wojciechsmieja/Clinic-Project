package com.example.clinic.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @OneToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name="id_prac", nullable=false)
    private Employee employee;

    public LabManager(String imie, String surname, Employee idPrac) {

        this.imie = imie;
        this.surname = surname;
        this.employee = idPrac;
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

    public Employee getIdPrac() {
        return employee;
    }

    public void setIdPrac(Employee idPrac) {
        this.employee = idPrac;
    }
}
