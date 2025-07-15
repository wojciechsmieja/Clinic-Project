package com.example.clinic.controller;

import com.example.clinic.entity.Visit;
import com.example.clinic.service.VisitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/visits")
@CrossOrigin
public class VisitController {
    private final VisitService visitService;

    public VisitController(VisitService visitService) {
        this.visitService = visitService;
    }

    @PostMapping
    public ResponseEntity<Visit> addVisit(@RequestBody Visit visit) {
        return ResponseEntity.ok(visitService.addVisit(visit));
    }

    @GetMapping
    public List<Visit> getAllVisits() {
        return visitService.getAllVisits();
    }



}
