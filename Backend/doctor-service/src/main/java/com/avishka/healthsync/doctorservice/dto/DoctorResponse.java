package com.avishka.healthsync.doctorservice.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorResponse {

    private Long id;
    private String fullName;
    private String email;
    private String specialization;
    private String hospital;
    private Integer experience;
    private String phone;
    private String availability;
}
