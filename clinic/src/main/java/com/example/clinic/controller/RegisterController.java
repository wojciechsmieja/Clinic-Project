package com.example.clinic.controller;

import com.example.clinic.entity.Doctor;
import com.example.clinic.entity.Register;
import com.example.clinic.service.RegisterService;
import jakarta.persistence.*;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/register")
public class RegisterController {

    private final RegisterService RegisterService;

    public RegisterController(RegisterService RegisterService) {
        this.RegisterService = RegisterService;
    }

    @PostMapping
    public Register addRegister(@RequestBody Register register) {
        return RegisterService.saveRegister(register);
    }

    public List<Register> getAllRegisters(){
        return RegisterService.getAllRegisters();
    }

}
