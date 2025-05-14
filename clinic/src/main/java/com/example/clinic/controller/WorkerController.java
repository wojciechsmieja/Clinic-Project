package com.example.clinic.controller;

import com.example.clinic.entity.Worker;
import com.example.clinic.service.WorkerService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/workers")
public class WorkerController {

    private final WorkerService service;
    public WorkerController(WorkerService service) {
        this.service = service;
    }
    @GetMapping
    public List<Worker> getAllWorkers(){
        return service.getAllWorkers();
    }
}
