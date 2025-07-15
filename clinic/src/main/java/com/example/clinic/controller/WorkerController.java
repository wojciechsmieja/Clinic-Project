package com.example.clinic.controller;

import com.example.clinic.dto.NewWorkerRequest;
import com.example.clinic.entity.Worker;
import com.example.clinic.service.WorkerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workers")
@CrossOrigin
public class WorkerController {

    private final WorkerService service;
    public WorkerController(WorkerService service) {
        this.service = service;
    }

    /*@PostMapping
    public ResponseEntity<String> addWorker(@RequestBody NewWorkerRequest resquest){
        /service.addWorker(resquest);
        return ResponseEntity.ok("Worker added");
    }*/


    @GetMapping
    public List<Worker> getAllWorkers(){
        return service.getAllWorkers();
    }
}
