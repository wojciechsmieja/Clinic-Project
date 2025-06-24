package com.example.clinic.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name="rejestrator")
public class Register {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_rej", nullable=false)
    private Long id_rej;

    @Column(name="imie", nullable=false)
    private String name;

    @Column(name="nazwisko", nullable=false)
    private String surname;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="id_prac", nullable=false)
    private Employee employee;

    public Register() {}

    public Long getId() {
        return id_rej;
    }

    public void setId(Long id) {
        this.id_rej = id;
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
