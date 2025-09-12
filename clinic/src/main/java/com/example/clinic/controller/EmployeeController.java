package com.example.clinic.controller;

import com.example.clinic.dto.EmployeeDTO;
import com.example.clinic.dto.EmployeeRequest;
import com.example.clinic.dto.EmployeeUpdateDTO;
import com.example.clinic.entity.Doctor;
import com.example.clinic.service.DoctorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.example.clinic.entity.Employee;
import com.example.clinic.service.EmployeeService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    private final EmployeeService employeeService;
    private final DoctorService doctorService;
    //private final PasswordEncoder passwordEncoder;

    public EmployeeController(EmployeeService employeeService, DoctorService doctorService/*, PasswordEncoder passwordEncoder*/) {
        this.employeeService = employeeService;
        this.doctorService = doctorService;
        //this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public List<EmployeeDTO> getAllEmployees() {
        return employeeService.getAllEmployeeDTOs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<String> addEmployee(@RequestBody EmployeeRequest req) {
        try {
            employeeService.addEmployee(req);
            return ResponseEntity.ok("Pracownik dodany pomyślnie");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Błąd: " + e.getMessage());
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        if (employeeService.getEmployeeById(id).isPresent()) {
            employeeService.deleteEmployee(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDTO> updateEmployee(@PathVariable Long id, @RequestBody EmployeeUpdateDTO dto) {
        try{
            EmployeeDTO updatedEmployee =  employeeService.updateEmployee(id, dto);
            return ResponseEntity.ok(updatedEmployee);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
