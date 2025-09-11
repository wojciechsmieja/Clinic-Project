package com.example.clinic.service;


import com.example.clinic.dto.LabExamDTO;
import com.example.clinic.entity.Employee;
import com.example.clinic.entity.LabManager;
import com.example.clinic.entity.LabTech;
import com.example.clinic.entity.LaboratoryExamination;
import com.example.clinic.repository.EmployeeRepository;
import com.example.clinic.repository.LabManagerRepository;
import com.example.clinic.repository.LaboratoryExaminationRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LabManagerService {
    private final LabManagerRepository repository;
    private final LaboratoryExaminationRepository labExamRepository;
    private final EmployeeRepository employeeRepository;

    public LabManagerService(LabManagerRepository repository, LaboratoryExaminationRepository labExamRepository, EmployeeRepository employeeRepository) {
        this.repository = repository;
        this.labExamRepository = labExamRepository;
        this.employeeRepository = employeeRepository;
    }

    public List<LabManager> getAllLabManagers(){

        return repository.findAll();
    }

    public List<LabExamDTO> getCompletedExams() {
        return labExamRepository.findByStatus("Wykonane").stream()
                .map(exam -> new LabExamDTO(
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
    public void approveExam(Long examId){
        LaboratoryExamination exam= labExamRepository.findById(examId)
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
        LabManager labManager = repository.findByEmployee(employee)
                .orElseThrow(()-> new RuntimeException("LabManager not found"));
        exam.setStatus("Zatwierdzone");
        exam.setApprovalOrCancellationDate(LocalDate.now());
        exam.setLabManager(labManager);
        labExamRepository.save(exam);
    }
    public void managerCancelExam(Long examId, String reason){
        LaboratoryExamination exam = labExamRepository.findById(examId)
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
        LabManager labManager = repository.findByEmployee(employee)
                .orElseThrow(()-> new RuntimeException("LabManager not found"));
        exam.setStatus("Anulowane przez kierownika");
        exam.setCancelReason(reason);
        exam.setApprovalOrCancellationDate(LocalDate.now());
        exam.setLabManager(labManager);
        labExamRepository.save(exam);
    }
}
