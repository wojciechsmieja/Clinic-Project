package com.example.clinic.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name="laborant")
public class LabTech {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_lab", nullable=false)
    private Long id;

    @Column(name="imie", nullable = false, length = 32)
    private String name;

    @Column(name="nazwisko", nullable = false, length = 32)
    private String surname;

    @OneToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name="id_prac", nullable=false)
    private Employee employee;

    public LabTech() {}
    public LabTech( String name, String surname, Employee employee) {

        this.name = name;
        this.surname = surname;
        this.employee = employee;
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

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
