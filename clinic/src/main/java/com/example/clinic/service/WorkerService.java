package com.example.clinic.service;

import com.example.clinic.entity.*;
import com.example.clinic.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.clinic.dto.NewWorkerRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


import java.util.List;

@Service
public class WorkerService {

    private final WorkerRepository repository;

    public WorkerService(WorkerRepository repository) {
        this.repository = repository;
    }

    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private RegisterRepository registerRepository;
    @Autowired
    private LabTechRepository labTechRepository;
    @Autowired
    private LabManagerRepository labManagerRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
/*
    public void addWorker(NewWorkerRequest dto) {
        Worker worker = new Worker();
        worker.setUsername(dto.username);
        worker.setPassword(passwordEncoder.encode(dto.password));
        worker.setPesel(dto.pesel);
        worker.setData_ur(dto.data_ur);
        worker.setStatus(dto.status);
        worker.setAdmin(dto.admin);

        // Zapisz pracownika i pobierz ID
        Worker saved = repository.save(worker);

        String role = dto.rola.toLowerCase();

        switch (role) {
            case "lekarz" -> {
                Doctor doctor = new Doctor(dto.imie, dto.npwz, dto.nazwisko, saved); // musi mieć setIdLek lub setWorkerId
                doctor.setId(saved.getId());
                doctorRepository.save(doctor);
                saved.setId_lek(doctor.getId());
            }
            case "rejestrator" -> {
                Register rejestrator = new Register();
                rejestrator.setId(saved.getId());
                registerRepository.save(rejestrator);
                saved.setId_rej(rejestrator.getId());
            }
            case "laborant" -> {
                LabTech laborant = new LabTech();
                laborant.setId(saved.getId());
                labTechRepository.save(laborant);
                saved.setId_lab(laborant.getId());
            }
            case "kierownik" -> {
                LabManager kierownik = new LabManager();
                kierownik.setId(saved.getId());
                labManagerRepository.save(kierownik);
                saved.setId_klab(kierownik.getId());
            }
            default -> throw new RuntimeException("Nieznana rola: " + dto.rola);
        }

        repository.save(saved); // aktualizacja relacji po przypisaniu id roli
    }




*/
    public List<Worker> getAllWorkers(){

        return repository.findAll();
    }

}
