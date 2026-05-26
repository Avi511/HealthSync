package com.avishka.appointmentservice.service.impl;

import com.avishka.appointmentservice.dto.AppointmentRequest;
import com.avishka.appointmentservice.dto.AppointmentResponse;
import com.avishka.appointmentservice.dto.UpdateStatusRequest;
import com.avishka.appointmentservice.entity.Appointment;
import com.avishka.appointmentservice.exception.ResourceNotFoundException;
import com.avishka.appointmentservice.mapper.AppointmentMapper;
import com.avishka.appointmentservice.repository.AppointmentRepository;
import com.avishka.appointmentservice.service.AppointmentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @Override
    public AppointmentResponse createAppointment(AppointmentRequest request) {
        Appointment appointment = AppointmentMapper.toEntity(request);
        
        boolean isBooked = appointmentRepository.existsByDoctorIdAndAppointmentDateAndAppointmentTimeAndStatusNot(
                appointment.getDoctorId(),
                appointment.getAppointmentDate(),
                appointment.getAppointmentTime(),
                com.avishka.appointmentservice.enums.AppointmentStatus.CANCELLED
        );
        
        if (isBooked) {
            throw new IllegalStateException("This time slot has already been booked for this doctor.");
        }
        
        Appointment savedAppointment = appointmentRepository.save(appointment);
        return AppointmentMapper.toResponse(savedAppointment);
    }

    @Override
    public List<AppointmentResponse> getAllAppointments() {
        return appointmentRepository.findAll()
                .stream()
                .map(AppointmentMapper::toResponse)
                .toList();
    }

    @Override
    public AppointmentResponse getAppointmentById(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));
        return AppointmentMapper.toResponse(appointment);
    }

    @Override
    public List<AppointmentResponse> getAppointmentsByPatient(Long patientId) {
        return appointmentRepository.findByPatientId(patientId)
                .stream()
                .map(AppointmentMapper::toResponse)
                .toList();
    }

    @Override
    public List<AppointmentResponse> getAppointmentsByDoctor(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId)
                .stream()
                .map(AppointmentMapper::toResponse)
                .toList();
    }

    @Override
    public AppointmentResponse updateStatus(Long id, UpdateStatusRequest request) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));
        appointment.setStatus(request.getStatus());
        Appointment updatedAppointment = appointmentRepository.save(appointment);
        return AppointmentMapper.toResponse(updatedAppointment);
    }

    @Override
    public void deleteAppointment(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));
        appointmentRepository.delete(appointment);
    }
}
