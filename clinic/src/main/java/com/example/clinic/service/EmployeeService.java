package com.example.clinic.service;

import com.example.clinic.dto.EmployeeRequest;
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
    public void addEmployee(EmployeeRequest dto) {
        Employee employee = new Employee();
        employee.setUsername(dto.username());
        employee.setPassword(passwordEncoder.encode(dto.password()));
        employee.setPesel(dto.pesel());
        employee.setData_ur(dto.data_ur());
        employee.setStatus(dto.status());
        employee.setAdmin(dto.admin());
        employee.setRola(dto.rola());
        // Zapisz pracownika i pobierz ID
        Employee saved = employeeRepository.save(employee);

        String role = dto.rola().toLowerCase();

        switch (role) {
            case "lekarz" -> {
                Doctor doctor = new Doctor(dto.name(), dto.npwz(), dto.surname(), saved); // musi mieć setIdLek lub setWorkerId
                doctorRepository.save(doctor);
            }
            case "rejestrator" -> {
                Register rejestrator = new Register(dto.name(),dto.surname(),saved);
                registerRepository.save(rejestrator);
            }
            case "laborant" -> {
                LabTech laborant = new LabTech(dto.name(),dto.surname(),saved);
                labTechRepository.save(laborant);
            }
            case "kierownik" -> {
                LabManager kierownik = new LabManager(dto.name(),dto.surname(),saved);
                labManagerRepository.save(kierownik);
            }
            case "admin" -> {
                System.out.println("dodano admin");
            }
            default -> throw new RuntimeException("Nieznana rola: " + dto.rola());
        }
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