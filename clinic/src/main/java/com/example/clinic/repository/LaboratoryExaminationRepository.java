package com.example.clinic.repository;

import com.example.clinic.entity.LaboratoryExamination;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LaboratoryExaminationRepository extends JpaRepository<LaboratoryExamination, Long> {
}
