package com.avishka.healthsync.doctorservice.service;

import com.avishka.healthsync.doctorservice.dto.DoctorRequest;
import com.avishka.healthsync.doctorservice.dto.DoctorResponse;

import java.util.List;

public interface DoctorService {

    DoctorResponse createDoctor(DoctorRequest request);

    List<DoctorResponse> getAllDoctors();

    DoctorResponse getDoctorById(Long id);

    DoctorResponse getDoctorByEmail(String email);

    List<DoctorResponse> getDoctorsBySpecialization(String specialization);

    DoctorResponse updateDoctor(Long id, DoctorRequest request);

    void deleteDoctor(Long id);
}
