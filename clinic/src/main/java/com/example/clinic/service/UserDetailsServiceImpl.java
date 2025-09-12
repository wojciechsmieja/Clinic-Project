package com.example.clinic.service;

import com.example.clinic.entity.Employee;
import com.example.clinic.repository.EmployeeRepository;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final EmployeeRepository employeeRepository;

    public UserDetailsServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        Employee employee = employeeRepository.findByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException("Username not found unlucky"));
        if("zwolniony".equalsIgnoreCase(employee.getStatus())){
            throw new DisabledException("Konto pracownika jest nieaktywne");
        }

        return new org.springframework.security.core.userdetails.User(
                employee.getUsername(),
                employee.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_"+employee.getRola().toUpperCase()))
        );

    }
}
