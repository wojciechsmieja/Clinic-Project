package com.example.clinic.controller;

import com.example.clinic.dto.LabExamDTO;
import com.example.clinic.entity.LabManager;
import com.example.clinic.service.LabManagerService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/labmanager")
public class LabManagerController {
    private final LabManagerService labManagerService;

    public LabManagerController(LabManagerService service){
        this.labManagerService = service;
    }

    @GetMapping
    public List<LabManager> getAllLabManagers(){
        return labManagerService.getAllLabManagers();
    }
    @GetMapping("/exams/completed")
    public List<LabExamDTO> getCompletedExams() {
        return labManagerService.getCompletedExams();
    }
}
