package com.example.clinic.dto;

public class PhysicalExamDTO {
    private String code;
    private String name;
    private String result;

    public PhysicalExamDTO() {}
    public PhysicalExamDTO(String code, String name, String result) {
        this.code = code;
        this.name = name;
        this.result = result;
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

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
}
