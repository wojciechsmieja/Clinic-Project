package com.example.clinic.service;


import com.example.clinic.entity.Register;
import com.example.clinic.repository.RegisterRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegisterService {

    private final RegisterRepository repository;

    public RegisterService(RegisterRepository repository) {
        this.repository = repository;
    }

    public Register saveRegister(Register register) {
        return repository.save(register);
    }

    public List<Register> getAllRegisters(){
        return repository.findAll();
    }

}
