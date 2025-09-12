package com.example.clinic.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class VisitDTO {
    private Integer id_wiz; // Added visit ID
    private String opis;
    private String status;
    private String diagnosis;
    private String data_wiz;
    private String czas_trwania;
    private Long id_lek;
    private PatientDTO patient;
    private DoctorDTO doctor;
    private Long id_rej;
    private Long id_pac;
    private List<PhysicalExamDTO> physicalExams;
    private List<LabExamDTO> labExams;
    private LocalDateTime cancelDate;


    // Constructors
    public VisitDTO() {}

    // Getters and setters
    public Integer getId_wiz() { return id_wiz; } // Added getter
    public void setId_wiz(Integer id_wiz) { this.id_wiz = id_wiz; } // Added setter

    public String getOpis() { return opis; }
    public void setOpis(String opis) { this.opis = opis; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getDiagnosis() { return diagnosis; }
    public void setDiagnosis(String diagnosis) { this.diagnosis = diagnosis; }

    public String getData_wiz() { return data_wiz; }
    public void setData_wiz(String data_wiz) { this.data_wiz = data_wiz; }

    public String getCzas_trwania() { return czas_trwania; }
    public void setCzas_trwania(String czas_trwania) { this.czas_trwania = czas_trwania; }

    public Long getId_lek() { return id_lek; }
    public void setId_lek(Long id_lek) { this.id_lek = id_lek; }

    public PatientDTO getPatient() { return patient; }
    public void setPatient(PatientDTO patient) { this.patient = patient; }

    public Long getId_rej() { return id_rej; }
    public void setId_rej(Long id_rej) { this.id_rej = id_rej; }

    public Long getId_pac() { return id_pac; }
    public void setId_pac(Long id_pac) { this.id_pac = id_pac; }

    public List<PhysicalExamDTO> getPhysicalExams() { return physicalExams; }
    public void setPhysicalExams(List<PhysicalExamDTO> physicalExams) {
        this.physicalExams = physicalExams;
    }

    public List<LabExamDTO> getLabExams() { return labExams; }
    public void setLabExams(List<LabExamDTO> labExams) {
        this.labExams = labExams;
    }

    public DoctorDTO getDoctor() { return doctor; }
    public void setDoctor(DoctorDTO doctor) { this.doctor = doctor; }

    public LocalDateTime getCancelDate() { return cancelDate; }
    public void setCancelDate(LocalDateTime cancelDate) { this.cancelDate = cancelDate; }

}
