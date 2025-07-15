package com.example.clinic.service;

import com.example.clinic.dto.NewWorkerRequest;
import com.example.clinic.entity.*;
import com.example.clinic.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository)
    {
        this.employeeRepository = employeeRepository;
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

    @Transactional
    public void addEmployee(NewWorkerRequest dto) {
        Employee employee = new Employee();
        employee.setUsername(dto.username);
        employee.setPassword(passwordEncoder.encode(dto.password));
        employee.setPesel(dto.pesel);
        employee.setData_ur(dto.data_ur);
        employee.setStatus(dto.status);
        employee.setAdmin(dto.admin);

        // Zapisz pracownika i pobierz ID
        Employee saved = employeeRepository.save(employee);

        String role = dto.rola.toLowerCase();

        switch (role) {
            case "lekarz" -> {
                Doctor doctor = new Doctor(dto.imie, dto.npwz, dto.nazwisko, saved); // musi mieć setIdLek lub setWorkerId
                doctorRepository.save(doctor);
                saved.setDoctor(doctor);
            }
            case "rejestrator" -> {
                Register rejestrator = new Register(dto.imie,dto.nazwisko,saved);
                registerRepository.save(rejestrator);
                saved.setRegister(rejestrator);
            }
            case "laborant" -> {
                LabTech laborant = new LabTech(dto.imie,dto.nazwisko,saved);
                labTechRepository.save(laborant);
                saved.setLabTech(laborant);
            }
            case "kierownik" -> {
                LabManager kierownik = new LabManager(dto.imie,dto.nazwisko,saved);
                labManagerRepository.save(kierownik);
                saved.setLabManager(kierownik);
            }
            default -> throw new RuntimeException("Nieznana rola: " + dto.rola);
        }

        employeeRepository.save(saved); // aktualizacja relacji po przypisaniu id roli
    }



    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}
/*








 */