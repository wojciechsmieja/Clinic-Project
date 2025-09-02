package com.example.clinic.dto;

public class VisitDTO {
    private Integer id_wiz; // Added visit ID
    private String opis;
    private String status;
    private String data_wiz;
    private String czas_trwania;
    private Long id_lek;
    private PatientDTO patient;
    private Long id_rej;

    // Constructors
    public VisitDTO() {}

    // Getters and setters
    public Integer getId_wiz() { return id_wiz; } // Added getter
    public void setId_wiz(Integer id_wiz) { this.id_wiz = id_wiz; } // Added setter

    public String getOpis() { return opis; }
    public void setOpis(String opis) { this.opis = opis; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

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
}
