package com.example.clinic.controller;

import com.example.clinic.entity.Patient;
import com.example.clinic.repository.PatientRepository;
import com.example.clinic.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @PreAuthorize("hasRole('REJESTRATOR')")
    @GetMapping
    public List<Patient> getAllPatients(){
        return patientService.getAllPatients();
    }
    @PreAuthorize("hasRole('REJESTRATOR')")
    @PostMapping
    public Patient addPatient(@RequestBody @Valid Patient patient) {
        return patientService.savePatient(patient);
    }
    @PreAuthorize("hasRole('REJESTRATOR')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id){
        try{
            Patient patient = patientService.getPatientById(id);
            return ResponseEntity.ok(patient);
        } catch (RuntimeException e){
            return ResponseEntity.notFound().build();
        }
    }
}

