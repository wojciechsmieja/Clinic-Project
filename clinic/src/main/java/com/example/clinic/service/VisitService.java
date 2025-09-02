package com.example.clinic.service;

import com.example.clinic.dto.PatientDTO;
import com.example.clinic.dto.VisitDTO;
import com.example.clinic.entity.*;
import com.example.clinic.repository.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VisitService {
    private final VisitRepository visitRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final RegisterRepository registerRepository;
    private final EmployeeRepository employeeRepository;

    public VisitService(VisitRepository visitRepository,
                        DoctorRepository doctorRepository,
                        PatientRepository patientRepository,
                        RegisterRepository registerRepository,
                        EmployeeRepository employeeRepository) {
        this.visitRepository = visitRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
        this.registerRepository = registerRepository;
        this.employeeRepository = employeeRepository;
    }

    public List<VisitDTO> getVisitForCurrentUser(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;

        if(principal instanceof UserDetails){
            username = ((UserDetails) principal).getUsername();
        }else{
            username = principal.toString();
        }
        Employee employee = employeeRepository.findByUsername(username)
            .orElseThrow(()-> new RuntimeException("Employee not found for Username: " + username));
        Doctor doctor = doctorRepository.findByEmployee(employee)
                .orElseThrow(()-> new RuntimeException("Doctor not found for Employee: " + username));
        return visitRepository.findByDoctor(doctor)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Visit convertAndSave(VisitDTO visitDTO) {
        Visit visit = new Visit();

        visit.setDescription(visitDTO.getOpis());
        visit.setStatus(visitDTO.getStatus());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
        LocalDateTime dateTime = LocalDateTime.parse(visitDTO.getData_wiz(), formatter);
        visit.setDate(dateTime);

        Duration duration = parseDuration(visitDTO.getCzas_trwania());
        visit.setDuration(duration);

        Doctor doctor = doctorRepository.findById(visitDTO.getId_lek())
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + visitDTO.getId_lek()));
        visit.setDoctor(doctor);

        Register register = registerRepository.findById(visitDTO.getId_rej())
                .orElseThrow(() -> new RuntimeException("Register not found with id: " + visitDTO.getId_rej()));
        visit.setRegister(register);

        return visitRepository.save(visit);
    }

    private Duration parseDuration(String timeString) {
        if (timeString == null || timeString.isEmpty()) {
            return Duration.ZERO;
        }
        String[] parts = timeString.split(":");
        int hours = Integer.parseInt(parts[0]);
        int minutes = Integer.parseInt(parts[1]);
        int seconds = parts.length > 2 ? Integer.parseInt(parts[2]) : 0;
        return Duration.ofHours(hours).plusMinutes(minutes).plusSeconds(seconds);
    }

    public void deleteVisit(Integer id){
        visitRepository.deleteById(id);
    }

    /**
     * Fetches all visits from the database and converts them to a list of VisitDTOs.
     * This is the method that should be used by your VisitController.
     * @return List of VisitDTO objects.
     */
    public List<VisitDTO> getAllVisits() {
        return visitRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Helper method to convert a Visit entity to a VisitDTO.
     * @param visit The Visit entity from the database.
     * @return A VisitDTO object ready to be sent to the frontend.
     */
    private VisitDTO convertToDto(Visit visit) {
        VisitDTO dto = new VisitDTO();

        // Set basic fields from the entity
        dto.setId_wiz(visit.getId()); // Set the ID
        dto.setOpis(visit.getDescription());
        dto.setStatus(visit.getStatus());
        dto.setData_wiz(visit.getDate().toString()); // Convert LocalDateTime to String
        dto.setCzas_trwania(visit.getDuration().toString()); // Convert Duration to String (e.g., "PT30M")

        // Set related entity IDs
        if (visit.getDoctor() != null) {
            dto.setId_lek(visit.getDoctor().getId());
        }
        if (visit.getRegister() != null) {
            dto.setId_rej(visit.getRegister().getId());
        }

        // Create and set PatientDTO from the associated Patient entity
        Patient patientEntity = visit.getPatient();
        if (patientEntity != null) {
            PatientDTO patientDto = new PatientDTO(patientEntity.getName(), patientEntity.getSurname());
            dto.setPatient(patientDto); // Corrected setter name
        }

        return dto;
    }
}
