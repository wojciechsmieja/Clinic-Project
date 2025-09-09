package com.example.clinic.dto;

public class LabExamDTO {
    private String code;
    private String name;
    private String doctorNotes;
    private String status;

    public LabExamDTO(){}

    public LabExamDTO(String code, String name, String doctorNotes, String status) {
        this.code = code;
        this.name = name;
        this.doctorNotes = doctorNotes;
        this.status = status;
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
}
