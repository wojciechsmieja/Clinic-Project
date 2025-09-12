package com.example.clinic.repository;

import com.example.clinic.entity.Doctor;
import com.example.clinic.entity.Employee;
import com.example.clinic.entity.Register;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegisterRepository extends JpaRepository<Register, Long> {
    Optional<Register> findByEmployee(Employee employee);
}