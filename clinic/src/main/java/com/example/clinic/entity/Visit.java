package com.example.clinic.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.Duration;
import java.time.LocalDateTime;

@Entity
@Table(name="wizyta")
public class Visit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_wiz")
    private Integer id;

    @Column(name = "opis", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "diagnoza", columnDefinition = "TEXT")
    private String diagnosis;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "data_wiz", nullable = false)
    private LocalDateTime date;

    @Column(name = "czas_trwania", nullable = false)
    private Duration duration;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_pac", nullable = false)
    private Patient patient;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_rej", nullable = false)
    private Register register;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_lek", nullable = false)
    private Doctor doctor;

    @Column(name = "czas_zak_anul")
    private LocalDateTime cancellationTime;

    public Visit(Integer id, String description, String diagnosis, String status, LocalDateTime date, Duration duration, Patient patient, Register register, Doctor doctor, LocalDateTime cancellationTime) {
        this.id = id;
        this.description = description;
        this.diagnosis = diagnosis;
        this.status = status;
        this.date = date;
        this.duration = duration;
        this.patient = patient;
        this.register = register;
        this.doctor = doctor;
        this.cancellationTime = cancellationTime;
    }
    public Visit() {}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public Duration getDuration() {
        return duration;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Register getRegister() {
        return register;
    }

    public void setRegister(Register register) {
        this.register = register;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public LocalDateTime getCancellationTime() {
        return cancellationTime;
    }

    public void setCancellationTime(LocalDateTime cancellationTime) {
        this.cancellationTime = cancellationTime;
    }
}
