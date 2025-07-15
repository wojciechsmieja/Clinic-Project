package com.example.clinic.service;


import com.example.clinic.dto.VisitDTO;
import com.example.clinic.entity.Doctor;
import com.example.clinic.entity.Patient;
import com.example.clinic.entity.Register;
import com.example.clinic.entity.Visit;
import com.example.clinic.repository.DoctorRepository;
import com.example.clinic.repository.PatientRepository;
import com.example.clinic.repository.RegisterRepository;
import com.example.clinic.repository.VisitRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class VisitService {
    private final VisitRepository visitRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final RegisterRepository registerRepository;

    public VisitService(VisitRepository visitRepository,
                        DoctorRepository doctorRepository,
                        PatientRepository patientRepository,
                        RegisterRepository registerRepository) {
        this.visitRepository = visitRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
        this.registerRepository = registerRepository;
    }

    public Visit convertAndSave(VisitDTO visitDTO) {
        // Convert DTO to Entity
        System.out.println("Received DTO: " + visitDTO.getOpis() + ", " + visitDTO.getData_wiz() + ", " + visitDTO.getId_lek() + ", " + visitDTO.getId_pac());
        Visit visit = new Visit();

        // Set simple fields
        visit.setDescription(visitDTO.getOpis());
        visit.setStatus(visitDTO.getStatus());

        // Parse and set datetime
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
        LocalDateTime dateTime = LocalDateTime.parse(visitDTO.getData_wiz(), formatter);
        visit.setDate(dateTime);

        // Parse and set duration
        Duration duration = parseDuration(visitDTO.getCzas_trwania());
        visit.setDuration(duration);

        // Fetch and set entity relationships
        Doctor doctor = doctorRepository.findById(visitDTO.getId_lek())
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + visitDTO.getId_lek()));
        visit.setDoctor(doctor);

        Patient patient = patientRepository.findById(visitDTO.getId_pac())
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + visitDTO.getId_pac()));
        visit.setPatient(patient);

        Register register = registerRepository.findById(visitDTO.getId_rej())
                .orElseThrow(() -> new RuntimeException("Register not found with id: " + visitDTO.getId_rej()));
        visit.setRegister(register);

        // Save and return
        return visitRepository.save(visit);
    }

    private Duration parseDuration(String timeString) {
        // Parse "00:30:00" format to Duration
        String[] parts = timeString.split(":");
        int hours = Integer.parseInt(parts[0]);
        int minutes = Integer.parseInt(parts[1]);
        int seconds = Integer.parseInt(parts[2]);

        return Duration.ofHours(hours).plusMinutes(minutes).plusSeconds(seconds);
    }

    public List<Visit> getAllVisits() {
        return visitRepository.findAll();
    }

    // Keep your existing methods
    public Visit addVisit(Visit visit) {
        return visitRepository.save(visit);
    }
}
