package com.example.clinic.controller;


import com.example.clinic.dto.AuthRequest;
import com.example.clinic.dto.AuthResponse;
import com.example.clinic.repository.EmployeeRepository;
import com.example.clinic.service.JwtService;
import com.example.clinic.service.UserDetailsServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsService;
    private final JwtService jwtService;
    private final EmployeeRepository employeeRepository;

    public AuthController(AuthenticationManager authenticationManager, UserDetailsServiceImpl userDetailsService, JwtService jwtService, EmployeeRepository employeeRepository) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtService = jwtService;
        this.employeeRepository = employeeRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request){
        System.out.println("Odebrane dane: username="+request.getUsername()+", password= "+request.getPassword());
        try{
            //auth attempt
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            //(switch) -> success
            UserDetails userDetails=userDetailsService.loadUserByUsername(request.getUsername());
            String jwt=jwtService.generateToken(userDetails);
            String role = userDetails.getAuthorities().stream().findFirst().get().getAuthority();
            String username = userDetails.getUsername();

            Long id = employeeRepository.findByUsername(username)
                    .map(com.example.clinic.entity.Employee::getId_prac)
                    .orElseThrow(()-> new RuntimeException("Employee not found"));
            System.out.println(id);

            return ResponseEntity.ok(new AuthResponse(jwt, role, id));
        }catch(AuthenticationException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }













}
