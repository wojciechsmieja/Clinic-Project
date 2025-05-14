package com.example.clinic.service;

import com.example.clinic.entity.LabTech;
import com.example.clinic.repository.LabTechRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LabTechService {

    private final LabTechRepository repository;

    public LabTechService(LabTechRepository repository) {
        this.repository = repository;
    }

    public List<LabTech> getAllLabTech(){
        return repository.findAll();
    }

}
