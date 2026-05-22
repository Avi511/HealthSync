package com.avishka.healthsync.doctorservice.mapper;

import com.avishka.healthsync.doctorservice.dto.DoctorRequest;
import com.avishka.healthsync.doctorservice.dto.DoctorResponse;
import com.avishka.healthsync.doctorservice.entity.Doctor;

public class DoctorMapper {

    public static Doctor toEntity(DoctorRequest request) {

        return Doctor.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .specialization(request.getSpecialization())
                .hospital(request.getHospital())
                .experience(request.getExperience())
                .stage(request.getStage())
                .phone(request.getPhone())
                .availability(request.getAvailability())
                .build();
    }

    public static DoctorResponse toResponse(Doctor doctor) {

        return DoctorResponse.builder()
                .id(doctor.getId())
                .fullName(doctor.getFullName())
                .email(doctor.getEmail())
                .specialization(doctor.getSpecialization())
                .hospital(doctor.getHospital())
                .experience(doctor.getExperience())
                .stage(doctor.getStage())
                .phone(doctor.getPhone())
                .availability(doctor.getAvailability())
                .build();
    }
}
