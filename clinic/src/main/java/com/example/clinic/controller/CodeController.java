package com.example.clinic.controller;

import com.example.clinic.entity.Code;
import com.example.clinic.repository.CodeRepository;
import com.example.clinic.service.CodeService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/codes")
@CrossOrigin
public class CodeController {

    private final CodeService codeService;

    public CodeController(CodeService codeService) {
        this.codeService = codeService;
    }

    @GetMapping("/physical")
    public List<Code> getPhysicalExaminationCodes() {
        return codeService.getPhysicalExaminationCodes();
    }

    @GetMapping("/laboratory")
    public List<Code> getLaboratoryExaminationCodes() {
        return codeService.getLaboratoryExaminationCodes();
    }
}
