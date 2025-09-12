package com.example.clinic.service;

import com.example.clinic.dto.LabExamDTO;
import com.example.clinic.entity.Employee;
import com.example.clinic.entity.LabTech;
import com.example.clinic.entity.LaboratoryExamination;
import com.example.clinic.repository.EmployeeRepository;
import com.example.clinic.repository.LabTechRepository;
import com.example.clinic.repository.LaboratoryExaminationRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LabTechService {

    private final LabTechRepository repository;
    private final LaboratoryExaminationRepository laboratoryExaminationRepository;
    private final EmployeeRepository employeeRepository;

    public LabTechService(LabTechRepository repository, LaboratoryExaminationRepository laboratoryExaminationRepository, EmployeeRepository employeeRepository) {
        this.repository = repository;
        this.laboratoryExaminationRepository = laboratoryExaminationRepository;
        this.employeeRepository = employeeRepository;
    }

    public List<LabTech> getAllLabTech(){
        return repository.findAll();
    }

    public List<LabExamDTO> getOrderedExams(){
        return laboratoryExaminationRepository.findByStatus("Zlecone").stream()
                .map(exam->new LabExamDTO(
                        exam.getId(),
                        exam.getCode().getCode(),
                        exam.getCode().getName(),
                        exam.getDoctorNotes(),
                        exam.getStatus(),
                        exam.getResult(),
                        exam.getCancelReason()
                ))
                .collect(Collectors.toList());
    }

    public void completeExam(Long examId, String result){
        LaboratoryExamination exam= laboratoryExaminationRepository.findById(examId)
                .orElseThrow(()-> new IllegalArgumentException("Exam not found"));
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if(principal instanceof UserDetails){
            username = ((UserDetails)principal).getUsername();
        }else{
            username = principal.toString();
        }
        Employee employee = employeeRepository.findByUsername(username)
                        .orElseThrow(()-> new IllegalArgumentException("Employee not found"));
        LabTech labTech = repository.findByEmployee(employee)
                        .orElseThrow(()-> new RuntimeException("LabTech not found"));
        exam.setResult(result);
        exam.setStatus("Wykonane");
        exam.setExecutionOrCancellationDate(LocalDate.now());
        exam.setLabTech(labTech);
        laboratoryExaminationRepository.save(exam);
    }
    public void cancelExam(Long examId, String reason){
        LaboratoryExamination exam = laboratoryExaminationRepository.findById(examId)
                .orElseThrow(()-> new IllegalArgumentException("Exam not found"));
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if(principal instanceof UserDetails){
            username = ((UserDetails)principal).getUsername();
        }else{
            username = principal.toString();
        }
        Employee employee = employeeRepository.findByUsername(username)
                .orElseThrow(()-> new IllegalArgumentException("Employee not found"));
        LabTech labTech = repository.findByEmployee(employee)
                .orElseThrow(()-> new RuntimeException("LabTech not found"));
        exam.setStatus("Anulowane");
        exam.setCancelReason(reason);
        exam.setExecutionOrCancellationDate(LocalDate.now());
        exam.setLabTech(labTech);
        laboratoryExaminationRepository.save(exam);
    }


}
