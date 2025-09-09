package com.example.clinic.repository;

import com.example.clinic.dto.VisitDTO;
import com.example.clinic.entity.Doctor;
import com.example.clinic.entity.Visit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface VisitRepository extends JpaRepository<Visit, Integer> {
    List<Visit> findByDoctor(Doctor doctor);

    List<Visit> findByDoctorAndDateBetween(Doctor doctor, LocalDateTime start, LocalDateTime end);

    VisitDTO getVisitById(Integer id);
}
