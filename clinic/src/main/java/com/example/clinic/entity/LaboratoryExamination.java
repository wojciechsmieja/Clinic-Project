package com.example.clinic.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.persistence.Entity;

import java.time.LocalDate;

@Entity
@Table(name="badanie_lab")
public class LaboratoryExamination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Column(name="data_zlec", nullable=false)
    private LocalDate orderDate;
    @Column(name="status")
    private String status;
    @Column(name="data_wyk_anul")
    private LocalDate executionOrCancellationDate;
    @Column(name="wynik")
    private String result;
    @Column(name="uwagi_lek")
    private String doctorNotes;
    @Column(name="data_zatw_anul")
    private LocalDate approvalOrCancellationDate;
    @Column(name="uwagi_kier")
    private String managerNotes;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="id_lab")
    private LabTech labTech;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="sl_bad", referencedColumnName = "kod")
    private Code code;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="id_wiz", nullable = false)
    @JsonBackReference
    private Visit visit;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="id_klab")
    private LabManager labManager;
    public LaboratoryExamination() {}
    @Column(name="powod_anul")
    private String cancelReason;

    public LaboratoryExamination(Long id, LocalDate orderDate, String status, LocalDate executionOrCancellationDate, String result, String doctorNotes, LocalDate approvalOrCancellationDate, String managerNotes, LabTech labTech, Code code, Visit visit, LabManager labManager, String cancelReason) {
        Id = id;
        this.orderDate = orderDate;
        this.status = status;
        this.executionOrCancellationDate = executionOrCancellationDate;
        this.result = result;
        this.doctorNotes = doctorNotes;
        this.approvalOrCancellationDate = approvalOrCancellationDate;
        this.managerNotes = managerNotes;
        this.labTech = labTech;
        this.code = code;
        this.visit = visit;
        this.labManager = labManager;
        this.cancelReason = cancelReason;
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getExecutionOrCancellationDate() {
        return executionOrCancellationDate;
    }

    public void setExecutionOrCancellationDate(LocalDate executionOrCancellationDate) {
        this.executionOrCancellationDate = executionOrCancellationDate;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getDoctorNotes() {
        return doctorNotes;
    }

    public void setDoctorNotes(String doctorNotes) {
        this.doctorNotes = doctorNotes;
    }

    public LocalDate getApprovalOrCancellationDate() {
        return approvalOrCancellationDate;
    }

    public void setApprovalOrCancellationDate(LocalDate approvalOrCancellationDate) {
        this.approvalOrCancellationDate = approvalOrCancellationDate;
    }

    public String getManagerNotes() {
        return managerNotes;
    }

    public void setManagerNotes(String managerNotes) {
        this.managerNotes = managerNotes;
    }

    public LabTech getLabTech() {
        return labTech;
    }

    public void setLabTech(LabTech labTech) {
        this.labTech = labTech;
    }

    public Code getCode() {
        return code;
    }

    public void setCode(Code code) {
        this.code = code;
    }

    public Visit getVisit() {
        return visit;
    }

    public void setVisit(Visit visit) {
        this.visit = visit;
    }

    public LabManager getLabManager() {
        return labManager;
    }

    public void setLabManager(LabManager labManager) {
        this.labManager = labManager;
    }

    public String getCancelReason() {
        return cancelReason;
    }

    public void setCancelReason(String cancelReason) {
        this.cancelReason = cancelReason;
    }


}
