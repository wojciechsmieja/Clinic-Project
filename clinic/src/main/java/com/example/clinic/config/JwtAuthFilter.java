package com.example.clinic.config;


import com.example.clinic.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        System.out.println("JwtAuthFilter: Processing request to " + request.getRequestURI());
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("JwtAuthFilter: No JWT token found, passing to next filter.");
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7); // wytnij "Bearer "
        System.out.println("JwtAuthFilter: JWT token found.");
        try{
            username = jwtService.extractUsername(jwt);
            System.out.println("JwtAuthFilter: JWT token found.");
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                System.out.println("JwtAuthFilter: UserDetails loaded for " + username);
                if (jwtService.isTokenValid(jwt, userDetails)) {
                    System.out.println("JwtAuthFilter: Token is valid. Authenticating user.");
                    System.out.println("Zaladowane uprawnienia to: " + userDetails.getAuthorities()+" token:"+jwt);
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }else{
                    System.out.println("JwtAuthFilter: Token is invalid.");
                }
            }
        }catch (Exception e){
            System.err.println("JwtAuthFilter: Error processing JWT token: " + e.getMessage());
            e.printStackTrace();
        }




        filterChain.doFilter(request, response);
    }
}
