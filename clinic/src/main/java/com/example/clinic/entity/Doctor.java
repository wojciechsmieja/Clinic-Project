package com.example.clinic.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.http.converter.support.AllEncompassingFormHttpMessageConverter;

@Entity
@Table(name="lekarz")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_lek", nullable=false)
    private Long id;

    @Column(name="imie", nullable=false, length = 32)
    private String name;

    @Column(name="nazwisko", nullable=false, length = 32)
    private String surname;

    @Column(nullable=false, length = 7)
    private String npwz;

    @OneToOne(/*mappedBy = "doctor",*/ fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name="id_prac", nullable=false)
    private Employee employee;

    public Doctor() {  }

    public Doctor( String name, String npwz ,String surname, Employee employee) {
        this.name = name;
        this.surname = surname;
        this.npwz = npwz;
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

    public String getNpwz() {
        return npwz;
    }

    public void setNpwz(String npwz) {
        this.npwz = npwz;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
