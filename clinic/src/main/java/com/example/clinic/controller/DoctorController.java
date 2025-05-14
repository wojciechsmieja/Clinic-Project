package com.example.clinic.controller;

import com.example.clinic.entity.Doctor;
import com.example.clinic.service.DoctorService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorService service;
    public DoctorController(DoctorService service) {
        this.service = service;
    }
    public List<Doctor> getAllDoctors(){
        return service.getAllDoctor();
    }
}
