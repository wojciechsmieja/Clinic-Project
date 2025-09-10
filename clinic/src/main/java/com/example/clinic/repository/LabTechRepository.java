package com.example.clinic.repository;

import com.example.clinic.entity.Employee;
import com.example.clinic.entity.LabTech;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LabTechRepository extends JpaRepository<LabTech, Long> {
    Optional<LabTech> findByEmployee(Employee employee);
}
