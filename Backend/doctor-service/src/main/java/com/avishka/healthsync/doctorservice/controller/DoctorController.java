package com.avishka.healthsync.doctorservice.controller;

import com.avishka.healthsync.doctorservice.dto.DoctorRequest;
import com.avishka.healthsync.doctorservice.dto.DoctorResponse;
import com.avishka.healthsync.doctorservice.service.DoctorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    @PostMapping
    public ResponseEntity<DoctorResponse> createDoctor(
            @Valid @RequestBody DoctorRequest request
    ) {
        return new ResponseEntity<>(
                doctorService.createDoctor(request),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<DoctorResponse>> getAllDoctors() {
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorResponse> getDoctorById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(doctorService.getDoctorById(id));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<DoctorResponse> getDoctorByEmail(
            @PathVariable String email
    ) {
        return ResponseEntity.ok(doctorService.getDoctorByEmail(email));
    }

    @GetMapping("/specialization/{specialization}")
    public ResponseEntity<List<DoctorResponse>> getDoctorsBySpecialization(
            @PathVariable String specialization
    ) {
        return ResponseEntity.ok(
                doctorService.getDoctorsBySpecialization(specialization)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<DoctorResponse> updateDoctor(
            @PathVariable Long id,
            @RequestBody DoctorRequest request
    ) {
        return ResponseEntity.ok(
                doctorService.updateDoctor(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDoctor(
            @PathVariable Long id
    ) {

        doctorService.deleteDoctor(id);

        return ResponseEntity.ok("Doctor deleted successfully");
    }
}
