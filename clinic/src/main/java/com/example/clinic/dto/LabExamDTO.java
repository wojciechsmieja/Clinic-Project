package com.example.clinic.dto;

public class LabExamDTO {
    private Long id;
    private String code;
    private String name;
    private String doctorNotes;
    private String status;
    private String result;
    private String cancelReason;

    public LabExamDTO(){}

    public LabExamDTO(Long id, String code, String name, String doctorNotes, String status, String result, String cancelReason) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.doctorNotes = doctorNotes;
        this.status = status;
        this.result=result;
        this.cancelReason=cancelReason;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }
    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDoctorNotes() {
        return doctorNotes;
    }

    public void setDoctorNotes(String doctorNotes) {
        this.doctorNotes = doctorNotes;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getResult() {
        return result;
    }
    public void setResult(String result) {
        this.result = result;
    }

    public String getCancelReason() {
        return cancelReason;
    }
    public void setCancelReason(String cancelReason) {
        this.cancelReason = cancelReason;
    }
}
