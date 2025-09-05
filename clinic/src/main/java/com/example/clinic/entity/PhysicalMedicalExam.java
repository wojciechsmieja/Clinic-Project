package com.example.clinic.entity;


import jakarta.persistence.*;
import com.example.clinic.entity.Code;

@Entity
@Table(name="badanie_fiz")
public class PhysicalMedicalExam {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    @Column(name="wynik")
    private String result;
    @ManyToOne
    @JoinColumn(name="id_wiz")
    private Visit visit;
    @OneToOne
    @JoinColumn(name="kod")
    private Code code;

    public PhysicalMedicalExam() {}
    public PhysicalMedicalExam(String result, Visit visit, Code code) {
        this.result = result;
        this.visit = visit;
        this.code = code;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public Visit getVisit() {
        return visit;
    }

    public void setVisit(Visit visit) {
        this.visit = visit;
    }

    public Code getCode() {
        return code;
    }

    public void setCode(Code code) {
        this.code = code;
    }
}
