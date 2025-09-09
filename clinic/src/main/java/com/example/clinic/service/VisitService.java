package com.example.clinic.service;

import com.example.clinic.dto.*;
import com.example.clinic.entity.*;
import com.example.clinic.repository.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VisitService {
    private final VisitRepository visitRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final RegisterRepository registerRepository;
    private final EmployeeRepository employeeRepository;
    private final PhysicalMedicalExamRepository physicalMedicalExamRepository;
    private final CodeRepository codeRepository;
    private final LaboratoryExaminationRepository laboratoryExaminationRepository;

    public VisitService(VisitRepository visitRepository,
                        DoctorRepository doctorRepository,
                        PatientRepository patientRepository,
                        RegisterRepository registerRepository,
                        EmployeeRepository employeeRepository,
                        PhysicalMedicalExamRepository physicalMedicalExamRepository,
                        CodeRepository codeRepository,
                        LaboratoryExaminationRepository laboratoryExaminationRepository) {
        this.visitRepository = visitRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
        this.registerRepository = registerRepository;
        this.employeeRepository = employeeRepository;
        this.physicalMedicalExamRepository = physicalMedicalExamRepository;
        this.codeRepository = codeRepository;
        this.laboratoryExaminationRepository = laboratoryExaminationRepository;
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

        //DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
        //LocalDateTime dateTime = LocalDateTime.parse(visitDTO.getData_wiz(), formatter);
        LocalDateTime dateTime = LocalDateTime.parse(visitDTO.getData_wiz());
        visit.setDate(dateTime);

        Duration duration = parseDuration(visitDTO.getCzas_trwania());
        visit.setDuration(duration);

        Doctor doctor = doctorRepository.findById(visitDTO.getId_lek())
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + visitDTO.getId_lek()));
        visit.setDoctor(doctor);

        Register register = registerRepository.findById(visitDTO.getId_rej())
                .orElseThrow(() -> new RuntimeException("Register not found with id: " + visitDTO.getId_rej()));
        visit.setRegister(register);

        Patient patient = patientRepository.findById(visitDTO.getId_pac())
                .orElseThrow(()-> new RuntimeException("Patient not found with id: "+visitDTO.getId_pac()));
        visit.setPatient(patient);

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


    public List<VisitDTO> getAllVisits() {
        return visitRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }


    private VisitDTO convertToDto(Visit visit) {
        VisitDTO dto = new VisitDTO();

        // Set basic fields from the entity
        dto.setId_wiz(visit.getId()); // Set the ID
        dto.setOpis(visit.getDescription());
        dto.setStatus(visit.getStatus());
        dto.setDiagnosis(visit.getDiagnosis());
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

        if(visit.getPhysicalExams() != null && !visit.getPhysicalExams().isEmpty()) {
            List<PhysicalExamDTO> examDTOs = visit.getPhysicalExams().stream()
                    .map(exam -> new PhysicalExamDTO(
                            exam.getCode().getCode(),
                            exam.getCode().getName(),
                            exam.getResult()
                    ))
                    .collect(Collectors.toList());
            dto.setPhysicalExams(examDTOs);
        }
        if(visit.getLabExams() != null && !visit.getLabExams().isEmpty()){
            List<LabExamDTO> examLabDTOs = visit.getLabExams().stream()
                    .map(exam -> new LabExamDTO(
                            exam.getCode().getCode(),
                            exam.getCode().getName(),
                            exam.getDoctorNotes(),
                            exam.getStatus()
                    ))
                    .collect(Collectors.toList());
            dto.setLabExams(examLabDTOs);
        }

        return dto;
    }
    public VisitDTO findVisitById(Integer id){
        return visitRepository.findById(id)
                .map(this::convertToDto)
                .orElseThrow(()->new RuntimeException("Visit not found with id: "+id));
    }

    public VisitDTO updateVisit(Integer id, Map<String, Object> updates){
        Visit visit = visitRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Visit not found with id: "+id));
        if(updates.containsKey("diagnosis")){
            visit.setDiagnosis((String) updates.get("diagnosis"));
        }

        if(updates.containsKey("status") && "Zakończona".equals(updates.get("status"))){
            visit.setStatus("Zakończona");
            visit.setCancellationTime(LocalDateTime.now());
        }
        Visit updatedVisit = visitRepository.save(visit);
        return convertToDto(updatedVisit);
    }

    public PhysicalMedicalExam addPhysicalExamToVisit(Integer id, PhysicalExamRequest request){
        Visit visit = visitRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Visit not found with id: "+id));
        Code code = codeRepository.findById(request.getCode())
                .orElseThrow(()->new RuntimeException("Code not found with id: "+request.getCode()));
        PhysicalMedicalExam newExam = new PhysicalMedicalExam();
        newExam.setVisit(visit);
        newExam.setCode(code);
        newExam.setResult(request.getResult());

        return physicalMedicalExamRepository.save(newExam);
    }

    public LaboratoryExamination addLaboratoryExamToVisit( Integer id, LabExamRequest request){
        Visit visit = visitRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Visit not found with id: "+id));
        Code code = codeRepository.findById(request.getCode())
                .orElseThrow(()->new RuntimeException("Code not found with id: "+request.getCode()));
        LaboratoryExamination newExam = new LaboratoryExamination();
        newExam.setVisit(visit);
        newExam.setCode(code);
        newExam.setDoctorNotes(request.getDoctorNotes());
        newExam.setOrderDate(LocalDate.now());
        newExam.setStatus("Zlecone");

        return laboratoryExaminationRepository.save(newExam);
    }

}
