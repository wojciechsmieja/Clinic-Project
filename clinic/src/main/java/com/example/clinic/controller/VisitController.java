package com.example.clinic.controller;

import com.example.clinic.dto.LabExamRequest;
import com.example.clinic.dto.VisitDTO;
import com.example.clinic.entity.LaboratoryExamination;
import com.example.clinic.entity.Visit;
import com.example.clinic.service.VisitService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.clinic.dto.PhysicalExamRequest;
import com.example.clinic.entity.PhysicalMedicalExam;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/visits")
@CrossOrigin
public class VisitController {
    private final VisitService visitService;

    public VisitController(VisitService visitService) {
        this.visitService = visitService;
    }

    @PostMapping
    public ResponseEntity<String> addVisit(@RequestBody VisitDTO dto) {
        System.out.println("VisitController: addVisit method entered");

        try {
            System.out.println("Request body: "+dto.toString());
            visitService.convertAndSave(dto);
            return ResponseEntity.ok("Wizyte dodano pomyslnie");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Błąd: " + e.getMessage());
        }
    }


    @GetMapping
    public List<VisitDTO> getVisits() {
        return visitService.getVisitForCurrentUser();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVisit(@PathVariable Integer id){
        visitService.deleteVisit(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<VisitDTO> findVisitById(@PathVariable Integer id){
        System.out.println("VisitController: findVisitById method entered");
        try{
            VisitDTO visitDTO = visitService.findVisitById(id);
            return ResponseEntity.ok(visitDTO);
        }catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<VisitDTO> updateVisit(@PathVariable Integer id, @RequestBody Map<String, Object> updates){
        try
        {
            VisitDTO updatedVisit = visitService.updateVisit(id, updates);
            return ResponseEntity.ok(updatedVisit);
        }catch (RuntimeException e){
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{visitId}/physical-exams")
    public ResponseEntity<PhysicalMedicalExam> addPhysicalExamForVisit(@PathVariable Integer visitId, @RequestBody PhysicalExamRequest request){
        try{
            PhysicalMedicalExam newExam = visitService.addPhysicalExamToVisit(visitId, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(newExam);
        }catch(RuntimeException e){
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{visitId}/lab-exams")
    public ResponseEntity<LaboratoryExamination> addLaboratoryExamForVisit (@PathVariable Integer visitId, @RequestBody LabExamRequest request){
        try{
            LaboratoryExamination newExam = visitService.addLaboratoryExamToVisit(visitId, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(newExam);
        }catch (RuntimeException e){
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/by-patient/{patientId}")
    public ResponseEntity<List<VisitDTO>> getVisitsByPatientId(@PathVariable Long patientId) {
        try{
            List<VisitDTO> patientVisits = visitService.getVisitsForPatient(patientId);
            return ResponseEntity.ok(patientVisits);
        }catch(Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }

}
