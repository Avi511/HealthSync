package com.avishka.healthsync.doctorservice.service.impl;

import com.avishka.healthsync.doctorservice.dto.DoctorRequest;
import com.avishka.healthsync.doctorservice.dto.DoctorResponse;
import com.avishka.healthsync.doctorservice.entity.Doctor;
import com.avishka.healthsync.doctorservice.exception.ResourceNotFoundException;
import com.avishka.healthsync.doctorservice.mapper.DoctorMapper;
import com.avishka.healthsync.doctorservice.repository.DoctorRepository;
import com.avishka.healthsync.doctorservice.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;

    @Override
    public DoctorResponse createDoctor(DoctorRequest request) {

        Doctor doctor = DoctorMapper.toEntity(request);
        Doctor savedDoctor = doctorRepository.save(doctor);

        return DoctorMapper.toResponse(savedDoctor);
    }

    @Override
    public List<DoctorResponse> getAllDoctors() {

        return doctorRepository.findAll()
                .stream()
                .sorted((d1, d2) -> d1.getId().compareTo(d2.getId()))
                .map(DoctorMapper::toResponse)
                .toList();
    }

    @Override
    public DoctorResponse getDoctorById(Long id) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));

        return DoctorMapper.toResponse(doctor);
    }

    @Override
    public DoctorResponse getDoctorByEmail(String email) {
        Doctor doctor = doctorRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with email: " + email));

        return DoctorMapper.toResponse(doctor);
    }

    @Override
    public List<DoctorResponse> getDoctorsBySpecialization(String specialization) {

        return doctorRepository.findBySpecialization(specialization)
                .stream()
                .map(DoctorMapper::toResponse)
                .toList();
    }

    @Override
    public DoctorResponse updateDoctor(Long id, DoctorRequest request) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));

        doctor.setFullName(request.getFullName());
        doctor.setEmail(request.getEmail());
        doctor.setSpecialization(request.getSpecialization());
        doctor.setHospital(request.getHospital());
        doctor.setExperience(request.getExperience());
        doctor.setStage(request.getStage());
        doctor.setPhone(request.getPhone());
        doctor.setAvailability(request.getAvailability());
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            doctor.setPassword(request.getPassword());
        }

        Doctor updatedDoctor = doctorRepository.save(doctor);

        return DoctorMapper.toResponse(updatedDoctor);
    }

    @Override
    public void deleteDoctor(Long id) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));

        doctorRepository.delete(doctor);
    }
}
