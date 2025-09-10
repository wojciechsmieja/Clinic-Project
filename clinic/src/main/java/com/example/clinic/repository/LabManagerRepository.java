package com.example.clinic.repository;


import com.example.clinic.entity.Employee;
import com.example.clinic.entity.LabManager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface LabManagerRepository extends JpaRepository<LabManager, Long> {
    Optional<LabManager> findByEmployee(Employee employee);
}
