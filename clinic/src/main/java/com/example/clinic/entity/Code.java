package com.example.clinic.entity;

import jakarta.persistence.*;

@Entity
@Table(name="slownik_bad")
public class Code {
    @Id
    @Column(name="kod", nullable=false, unique=true)
    private String code;
    @Column(name="typ", nullable = false)
    private String type;
    @Column(name="nazwa")
    private String name;

    public Code(){}

    public Code(String code, String type, String name) {
        this.name = name;
        this.type = type;
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
