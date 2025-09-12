package com.example.clinic.dto;

public class PatientDTO {
    private Long Id;
    private String name;
    private String surname;


    public PatientDTO(Long Id, String name, String surname) {
        this.name = name;
        this.surname = surname;
        this.Id = Id;
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

    public Long getId() {
        return Id;
    }
    public void setId(Long id) {
        Id = id;
    }

}
