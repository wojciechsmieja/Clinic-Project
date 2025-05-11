package com.example.clinic.repository;


import com.example.clinic.entity.LabManager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LabManagerRepository extends JpaRepository<LabManager, Long> {


}
