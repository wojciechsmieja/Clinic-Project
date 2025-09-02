package com.example.clinic.repository;

import com.example.clinic.entity.Doctor;
import com.example.clinic.entity.Visit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VisitRepository extends JpaRepository<Visit, Integer> {
    Optional<Visit> findByDoctor(Doctor doctor);
}
