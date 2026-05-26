package com.avishka.healthsync.doctorservice.repository;

import com.avishka.healthsync.doctorservice.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    List<Doctor> findBySpecialization(String specialization);
    java.util.Optional<Doctor> findByEmail(String email);
}
