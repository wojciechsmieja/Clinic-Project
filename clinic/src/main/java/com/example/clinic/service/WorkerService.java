package com.example.clinic.service;

import com.example.clinic.entity.Worker;
import com.example.clinic.repository.WorkerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkerService {

    private final WorkerRepository repository;

    public WorkerService(WorkerRepository repository) {
        this.repository = repository;
    }
    public List<Worker> getAllWorkers(){

        return repository.findAll();
    }

}
