package com.example.clinic.service;

import com.example.clinic.dto.EmployeeDTO;
import com.example.clinic.dto.EmployeeRequest;
import com.example.clinic.dto.EmployeeUpdateDTO;
import com.example.clinic.entity.*;
import com.example.clinic.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public List<EmployeeDTO> getAllEmployeeDTOs() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream()
                .map(this::mapToEmployeeDTO)
                .collect(Collectors.toList());
    }

    private EmployeeDTO mapToEmployeeDTO(Employee employee){
        EmployeeDTO dto = new EmployeeDTO();
        dto.setId(employee.getId_prac());
        dto.setUsername(employee.getUsername());
        String role = employee.getRola();
        dto.setRole(employee.getRola());
        dto.setPesel(employee.getPesel());
        dto.setDateOfBirth(employee.getData_ur());
        dto.setStatus(employee.getStatus());
        dto.setAdmin(employee.isAdmin());
        if(role != null) {
            switch (employee.getRola()) {
                case "lekarz":
                    doctorRepository.findByEmployee(employee).ifPresent(doctor -> {
                        dto.setName(doctor.getName());
                        dto.setSurname(doctor.getSurname());
                    });
                    break;
                case "rejestrator":
                    registerRepository.findByEmployee(employee).ifPresent(register -> {
                        dto.setName(register.getName());
                        dto.setSurname(register.getSurname());
                    });
                    break;
                case "laborant":
                    labTechRepository.findByEmployee(employee).ifPresent(labTech -> {
                        dto.setName(labTech.getName());
                        dto.setSurname(labTech.getSurname());
                    });
                    break;
                case "kierownik":
                    labManagerRepository.findByEmployee(employee).ifPresent(labManager -> {
                        dto.setName(labManager.getImie());
                        dto.setSurname(labManager.getSurname());
                    });
                    break;
            }
        }
        return dto;
    }
    @Transactional
    public EmployeeDTO updateEmployee(Long id, EmployeeUpdateDTO dto) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pracownik nie odnaleziony o id: " + id));
        employee.setData_ur(dto.getDateOfBirth());
        employee.setStatus(dto.getStatus());
        String role = employee.getRola();
        if (role != null) {
            switch (role.toLowerCase()) {
                case "lekarz":
                    doctorRepository.findByEmployee(employee).ifPresent(doctor -> {
                        doctor.setName(dto.getName());
                        doctor.setSurname(dto.getSurname());
                        doctorRepository.save(doctor);
                    });
                    break;
                case "rejestrator":
                    registerRepository.findByEmployee(employee).ifPresent(register -> {
                        register.setName(dto.getName());
                        register.setSurname(dto.getSurname());
                        registerRepository.save(register);
                    });
                    break;
                case "laborant":
                    labTechRepository.findByEmployee(employee).ifPresent(labTech -> {
                        labTech.setName(dto.getName());
                        labTech.setSurname(dto.getSurname());
                        labTechRepository.save(labTech);
                    });
                    break;
                case "kierownik":
                    labManagerRepository.findByEmployee(employee).ifPresent(labManager -> {
                        labManager.setImie(dto.getName());
                        labManager.setSurname(dto.getSurname());
                        labManagerRepository.save(labManager);
                    });
                    break;

            }
        }
        Employee updatedEmployee = employeeRepository.save(employee);
        return mapToEmployeeDTO(updatedEmployee);
    }
}