package com.example.clinic.dto;

import java.time.LocalDate;
import java.util.Date;

public class NewWorkerRequest {
    public String imie;
    public String nazwisko;
    public String npwz;
    public String username;
    public String password;
    public String pesel;
    public LocalDate data_ur;
    public String status;
    public String rola; // "lekarz", "rejestrator", "laborant", "kierownik"
    public Boolean admin;

    public NewWorkerRequest(String imie, String nazwisko, String npwz, String username, String password, String pesel, LocalDate data_ur, String status, String rola, Boolean admin) {
        this.imie = imie;
        this.nazwisko = nazwisko;
        this.npwz = npwz;
        this.username = username;
        this.password = password;
        this.pesel = pesel;
        this.data_ur = data_ur;
        this.status = status;
        this.rola = rola;
        this.admin = admin;
    }
    public NewWorkerRequest() {}

    public String getUsername() {
        return username;
    }

    public String getImie() {
        return imie;
    }

    public void setImie(String imie) {
        this.imie = imie;
    }

    public String getNazwisko() {
        return nazwisko;
    }

    public void setNazwisko(String nazwisko) {
        this.nazwisko = nazwisko;
    }

    public String getNpwz() {
        return npwz;
    }

    public void setNpwz(String npwz) {
        this.npwz = npwz;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPesel() {
        return pesel;
    }

    public void setPesel(String pesel) {
        this.pesel = pesel;
    }

    public LocalDate getData_ur() {
        return data_ur;
    }

    public void setData_ur(LocalDate data_ur) {
        this.data_ur = data_ur;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRola() {
        return rola;
    }

    public void setRola(String rola) {
        this.rola = rola;
    }

    public Boolean getAdmin() {
        return admin;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }
}
