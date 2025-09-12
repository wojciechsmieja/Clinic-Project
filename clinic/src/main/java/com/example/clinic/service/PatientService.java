package com.example.clinic.service;

import com.example.clinic.entity.Patient;
import com.example.clinic.repository.PatientRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class PatientService {

    private final PatientRepository repository;

    public PatientService(PatientRepository repository) {
        this.repository = repository;
    }

    public Patient savePatient(Patient patient){
        return repository.save(patient);
    }
    public void deletePatient(Long id) {
        repository.deleteById(id);
    }

    public List<Patient> getAllPatients(){

    return repository.findAll();
    }

    public Patient getPatientById(Long id) {
        return repository.findById(id)
                .orElseThrow(()-> new RuntimeException("Patient not found"));
    }
}
