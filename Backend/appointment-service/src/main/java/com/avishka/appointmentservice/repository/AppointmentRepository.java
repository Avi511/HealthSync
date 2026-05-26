// Backend modified
package com.avishka.appointmentservice.repository;

import com.avishka.appointmentservice.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatientId(Long patientId);
    List<Appointment> findByDoctorId(Long doctorId);
    
    boolean existsByDoctorIdAndAppointmentDateAndAppointmentTimeAndStatusNot(
            Long doctorId, java.time.LocalDate appointmentDate, java.time.LocalTime appointmentTime, com.avishka.appointmentservice.enums.AppointmentStatus status);
}
