package com.example.clinic.repository;

import com.example.clinic.entity.Doctor;
import com.example.clinic.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByEmployee(Employee employee);
}
