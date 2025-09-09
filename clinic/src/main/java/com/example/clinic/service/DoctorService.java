package com.example.clinic.service;


import com.example.clinic.entity.Doctor;
import com.example.clinic.repository.DoctorRepository;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import com.example.clinic.repository.VisitRepository;
import com.example.clinic.entity.Visit;

import java.util.List;
import java.time.*;
import java.util.ArrayList;
import java.util.Comparator;

@Service
public class DoctorService {
    private final DoctorRepository doctorRepository;
    private final VisitRepository visitRepository;

    public DoctorService(DoctorRepository repository, VisitRepository visitRepository) {
        this.doctorRepository = repository;
        this.visitRepository = visitRepository;
    }
    //hardcoded schedule
    private static final LocalTime WORK_START_TIME = LocalTime.of(9,0);
    private static final LocalTime WORK_END_TIME = LocalTime.of(15,0);

    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public List<Doctor> getAllDoctor(){
        return doctorRepository.findAll();
    }

    public List<LocalTime> getAvailableSlots(Long doctorId, LocalDate date, int durationInMinutes){
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: "+doctorId));
        LocalDateTime dayStart = date.atTime(WORK_START_TIME);
        LocalDateTime dayEnd = date.atTime(WORK_END_TIME);

        //fetch visits and sort them
        List<Visit> visits = visitRepository.findByDoctorAndDateBetween(doctor, dayStart, dayEnd);
        visits.sort(Comparator.comparing(Visit::getDate));

        List<LocalTime> availableSlots = new ArrayList<>();
        LocalDateTime nextAvailableTime = dayStart;

        //Itarate through visits to find gaps
        for (Visit visit : visits) {
            LocalDateTime visitStart = visit.getDate();
            //check the gaps
            while (nextAvailableTime.plusMinutes(durationInMinutes).compareTo(visitStart) <= 0) {
                if(!date.isEqual(LocalDate.now()) || nextAvailableTime.isAfter(LocalDateTime.now())) {
                    availableSlots.add(nextAvailableTime.toLocalTime());
                }
                nextAvailableTime = nextAvailableTime.plusMinutes(15);
            }
            //move the pointer to the end of the current visit
            LocalDateTime visitEnd = visit.getDate().plus(visit.getDuration());
            if (nextAvailableTime.isBefore(visitEnd)) {
                nextAvailableTime = visitEnd;
            }
        }
            //check for avaiolable slots after the last visit until the end of the day
        while(nextAvailableTime.plusMinutes(durationInMinutes).compareTo(dayEnd)<=0){
            if(!date.isEqual(LocalDate.now()) || nextAvailableTime.isAfter(LocalDateTime.now())) {
                availableSlots.add(nextAvailableTime.toLocalTime());
            }
            nextAvailableTime = nextAvailableTime.plusMinutes(15);
        }
        return availableSlots;
    }

    public List<LocalDate> getAvailableDays(Long doctorId, int year, int month, int durationInMinutes){
        doctorRepository.findById(doctorId)
                .orElseThrow(()->new RuntimeException("Doctor not found with id: "+doctorId));
        YearMonth yearMonth = YearMonth.of(year, month);
        List<LocalDate> availableDays = new ArrayList<>();

        for(int day = 1; day <= yearMonth.lengthOfMonth(); day++){
            LocalDate currentDate = yearMonth.atDay(day);
            if(currentDate.isBefore(LocalDate.now())){
                continue;
            }
            if(!getAvailableSlots(doctorId, currentDate, durationInMinutes).isEmpty()){
                availableDays.add(currentDate);
            }

        }
        return availableDays;
    }
}


