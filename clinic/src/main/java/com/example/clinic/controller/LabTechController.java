package com.example.clinic.controller;

import com.example.clinic.dto.CompleteExamRequest;
import com.example.clinic.dto.CancelExamRequest;
import com.example.clinic.dto.LabExamDTO;
import com.example.clinic.entity.LabTech;
import com.example.clinic.entity.LaboratoryExamination;
import com.example.clinic.service.LabTechService;
import jakarta.persistence.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/labtech")
public class LabTechController {

    private final LabTechService labTechService;

    public LabTechController(LabTechService labTechService) {
        this.labTechService = labTechService;
    }

    @GetMapping
    public List<LabTech> getAllLabTech(){
        return labTechService.getAllLabTech();
    }

    @GetMapping("/exams/ordered")
    public List<LabExamDTO> getOrderedExams(){
        return labTechService.getOrderedExams();
    }

    @PatchMapping("/exams/{id}/complete")
    public ResponseEntity<Void> completeExam(@PathVariable Long id, @RequestBody
    CompleteExamRequest request) {
        try {
            labTechService.completeExam(id, request.getResult());
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @PatchMapping("/exams/{id}/cancel")
    public ResponseEntity<Void> cancelExam(@PathVariable Long id, @RequestBody
    CancelExamRequest request) {
        try {
            labTechService.cancelExam(id, request.getReason());
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
