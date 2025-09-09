package com.example.clinic.controller;

import com.example.clinic.entity.Doctor;
import com.example.clinic.service.DoctorService;
import org.springframework.web.bind.annotation.*;
import org.springframework.format.annotation.DateTimeFormat;
import java.util.List;
import java.time.LocalDate;
import java.time.LocalTime;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {

    private final DoctorService service;
    public DoctorController(DoctorService service) {
        this.service = service;
    }

    @GetMapping
    public List<Doctor> getAllDoctors(){
        return service.getAllDoctor();
    }
    @PostMapping
    public Doctor addDoctor(@RequestBody Doctor doctor) {
        return service.saveDoctor(doctor);
    }
    @GetMapping("/{id}/available-days")
    public List<LocalDate> getAvailableDays(@PathVariable("id") Long doctorId, @RequestParam int year, @RequestParam int month, @RequestParam("duration") int durationInMinutes){
        return service.getAvailableDays(doctorId, year, month, durationInMinutes);
    }
    @GetMapping("/{id}/available-slots")
    public List<LocalTime> getAvailableSlots(@PathVariable("id") Long doctorId,
                                             @RequestParam @DateTimeFormat(iso=DateTimeFormat.ISO.DATE) LocalDate date,
                                             @RequestParam("duration") int durationInMinutes){
        return service.getAvailableSlots(doctorId, date, durationInMinutes);
    }

}
