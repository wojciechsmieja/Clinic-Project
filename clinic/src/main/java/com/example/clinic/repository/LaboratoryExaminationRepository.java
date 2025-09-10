package com.example.clinic.repository;

import com.example.clinic.entity.LaboratoryExamination;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LaboratoryExaminationRepository extends JpaRepository<LaboratoryExamination, Long> {
    List<LaboratoryExamination> findByStatus(String status);
}
