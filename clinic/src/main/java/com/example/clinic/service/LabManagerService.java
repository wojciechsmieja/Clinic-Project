package com.example.clinic.service;


import com.example.clinic.entity.LabManager;
import com.example.clinic.repository.LabManagerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LabManagerService {
    private final LabManagerRepository repository;

    public LabManagerService(LabManagerRepository repository) {
        this.repository = repository;
    }

    public List<LabManager> getAllLabManagers(){

        return repository.findAll();
    }
}
