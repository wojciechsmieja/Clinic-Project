package com.example.clinic.controller;

import com.example.clinic.entity.Register;
import com.example.clinic.service.RegisterService;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/Register")
public class RegisterController {

    private final RegisterService RegisterService;

    public RegisterController(RegisterService RegisterService) {
        this.RegisterService = RegisterService;
    }

    public List<Register> getAllRegisters(){
        return RegisterService.getAllRegisters();
    }

}
