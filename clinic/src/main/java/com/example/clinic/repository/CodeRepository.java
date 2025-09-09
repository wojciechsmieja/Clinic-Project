package com.example.clinic.repository;

import com.example.clinic.entity.Code;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CodeRepository extends JpaRepository<Code, String> {
    List<Code> findByType(String type);
}
