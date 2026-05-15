package com.avishka.appointmentservice.mapper;

import com.avishka.appointmentservice.dto.AppointmentRequest;
import com.avishka.appointmentservice.dto.AppointmentResponse;
import com.avishka.appointmentservice.entity.Appointment;
import com.avishka.appointmentservice.enums.AppointmentStatus;

public class AppointmentMapper {

    public static Appointment toEntity(AppointmentRequest request) {
        return Appointment.builder()
                .patientId(request.getPatientId())
                .doctorId(request.getDoctorId())
                .patientName(request.getPatientName())
                .doctorName(request.getDoctorName())
                .appointmentDate(request.getAppointmentDate())
                .appointmentTime(request.getAppointmentTime())
                .reason(request.getReason())
                .status(AppointmentStatus.PENDING)
                .build();
    }

    public static AppointmentResponse toResponse(Appointment appointment) {
        return AppointmentResponse.builder()
                .id(appointment.getId())
                .patientId(appointment.getPatientId())
                .doctorId(appointment.getDoctorId())
                .patientName(appointment.getPatientName())
                .doctorName(appointment.getDoctorName())
                .appointmentDate(appointment.getAppointmentDate())
                .appointmentTime(appointment.getAppointmentTime())
                .reason(appointment.getReason())
                .status(appointment.getStatus())
                .build();
    }
}
