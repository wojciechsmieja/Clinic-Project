package com.example.clinic.dto;

import java.time.LocalDate;

public record EmployeeRequest (
    String username,
    String password,
    String pesel,
    LocalDate data_ur,
    String status,
    boolean admin,
    String rola,
    String name,
    String surname,
    String npwz
    ) {}

