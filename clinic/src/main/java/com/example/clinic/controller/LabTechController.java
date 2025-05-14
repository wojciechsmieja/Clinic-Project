package com.example.clinic.controller;

import com.example.clinic.entity.LabTech;
import com.example.clinic.service.LabTechService;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/LabTech")
public class LabTechController {

    private final LabTechService labTechService;

    public LabTechController(LabTechService labTechService) {
        this.labTechService = labTechService;
    }

    public List<LabTech> getAllLabTech(){
        return labTechService.getAllLabTech();
    }

}
