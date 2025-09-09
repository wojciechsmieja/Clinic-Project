package com.example.clinic.service;

import com.example.clinic.entity.Code;
import com.example.clinic.repository.CodeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CodeService {
    private final CodeRepository codeRepository;

    public CodeService(CodeRepository codeRepository) {
        this.codeRepository = codeRepository;
    }

    public List<Code> getPhysicalExaminationCodes() {
        return codeRepository.findByType("F");
    }

    public List<Code> getLaboratoryExaminationCodes() {
        return codeRepository.findByType("L");
    }
}
