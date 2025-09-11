package com.example.clinic.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final UserDetailsService userDetailsService;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter, UserDetailsService userDetailsService) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/doctors/**").hasAnyRole("LEKARZ", "REJESTRATOR")
                        .requestMatchers("/api/visits/**").hasAnyRole("LEKARZ", "REJESTRATOR")
                        .requestMatchers("/api/register/**").hasRole("REJESTRATOR")
                        .requestMatchers("/api/patients**").hasRole("REJESTRATOR")
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        // --- Nowa, jawna konfiguracja dla laboranta i kierownika ---
                        .requestMatchers(HttpMethod.GET, "/api/labtech/**").hasRole("LABORANT")
                        .requestMatchers(HttpMethod.PATCH, "/api/labtech/**").hasRole("LABORANT")
                        .requestMatchers(HttpMethod.POST, "/api/labtech/**").hasRole("LABORANT")
                        .requestMatchers(HttpMethod.PUT, "/api/labtech/**").hasRole("LABORANT")
                        .requestMatchers(HttpMethod.DELETE, "/api/labtech/**").hasRole("LABORANT")

                        .requestMatchers(HttpMethod.GET, "/api/labmanager/**").hasRole("KIEROWNIK")
                        .requestMatchers(HttpMethod.PATCH, "/api/labmanager/**").hasRole("KIEROWNIK")
                        .requestMatchers(HttpMethod.POST, "/api/labmanager/**").hasRole("KIEROWNIK")
                        .requestMatchers(HttpMethod.PUT, "/api/labmanager/**").hasRole("KIEROWNIK")
                        .requestMatchers(HttpMethod.DELETE, "/api/labmanager/**").hasRole("KIEROWNIK")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

