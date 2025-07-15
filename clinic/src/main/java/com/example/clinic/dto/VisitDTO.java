package com.example.clinic.dto;

public class VisitDTO {
    private String opis;
    private String data_wiz;
    private String czas_trwania;
    private Long id_lek;
    private Long id_pac;
    private Long id_rej;
    private String status;

    // Constructors
    public VisitDTO() {}

    // Getters and setters
    public String getOpis() { return opis; }
    public void setOpis(String opis) { this.opis = opis; }

    public String getData_wiz() { return data_wiz; }
    public void setData_wiz(String data_wiz) { this.data_wiz = data_wiz; }

    public String getCzas_trwania() { return czas_trwania; }
    public void setCzas_trwania(String czas_trwania) { this.czas_trwania = czas_trwania; }

    public Long getId_lek() { return id_lek; }
    public void setId_lek(Long id_lek) { this.id_lek = id_lek; }

    public Long getId_pac() { return id_pac; }
    public void setId_pac(Long id_pac) { this.id_pac = id_pac; }

    public Long getId_rej() { return id_rej; }
    public void setId_rej(Long id_rej) { this.id_rej = id_rej; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
