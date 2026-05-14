package com.avishka.healthsync.doctorservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DoctorRequest {

    @NotBlank
    private String fullName;

    @Email
    private String email;

    private String specialization;

    private String hospital;

    private Integer experience;

    private String phone;

    private String availability;
}
