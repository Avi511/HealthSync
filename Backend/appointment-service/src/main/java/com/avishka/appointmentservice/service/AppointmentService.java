package com.avishka.appointmentservice.service;

import com.avishka.appointmentservice.dto.AppointmentRequest;
import com.avishka.appointmentservice.dto.AppointmentResponse;
import com.avishka.appointmentservice.dto.UpdateStatusRequest;

import java.util.List;

public interface AppointmentService {

    AppointmentResponse createAppointment(AppointmentRequest request);

    List<AppointmentResponse> getAllAppointments();

    AppointmentResponse getAppointmentById(Long id);

    List<AppointmentResponse> getAppointmentsByPatient(Long patientId);

    List<AppointmentResponse> getAppointmentsByDoctor(Long doctorId);

    AppointmentResponse updateStatus(Long id, UpdateStatusRequest request);

    void deleteAppointment(Long id);
}
