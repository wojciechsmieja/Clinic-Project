package com.example.clinic.controller;

import com.example.clinic.dto.VisitDTO;
import com.example.clinic.entity.Visit;
import com.example.clinic.service.VisitService;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<String> addVisit(@RequestBody VisitDTO dto) {
        System.out.println("VisitController: addVisit method entered");

        try {
            System.out.println("Request body: "+dto.toString());
            visitService.convertAndSave(dto);
            return ResponseEntity.ok("Wizyte dodano pomyslnie");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Błąd: " + e.getMessage());
        }
    }


    @GetMapping
    public List<VisitDTO> getVisits() {
        return visitService.getVisitForCurrentUser();
    }



}
