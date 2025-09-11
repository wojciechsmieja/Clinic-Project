package com.example.clinic.controller;

import com.example.clinic.dto.CancelExamRequest;
import com.example.clinic.dto.CompleteExamRequest;
import com.example.clinic.dto.LabExamDTO;
import com.example.clinic.entity.LabManager;
import com.example.clinic.entity.LaboratoryExamination;
import com.example.clinic.service.LabManagerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @PatchMapping("/exams/{id}/approve")
    public ResponseEntity<Void> approveExam(@PathVariable Long id) {
        try {
            labManagerService.approveExam(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @PatchMapping("/exams/{id}/cancel")
    public ResponseEntity<Void> cancelByManagerExam(@PathVariable Long id, @RequestBody
    CancelExamRequest request) {
        try {
            labManagerService.managerCancelExam(id, request.getReason());
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
