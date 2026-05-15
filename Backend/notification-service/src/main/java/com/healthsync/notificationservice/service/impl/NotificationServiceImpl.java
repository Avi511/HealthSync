package com.healthsync.notificationservice.service.impl;

import com.healthsync.notificationservice.dto.EmailRequest;
import com.healthsync.notificationservice.dto.NotificationResponse;
import com.healthsync.notificationservice.service.NotificationService;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final JavaMailSender mailSender;

    public NotificationServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public NotificationResponse sendEmail(EmailRequest request) {

        SimpleMailMessage mailMessage = new SimpleMailMessage();

        mailMessage.setTo(request.getTo());
        mailMessage.setSubject(request.getSubject());
        mailMessage.setText(request.getMessage());

        mailSender.send(mailMessage);

        return NotificationResponse.builder()
                .status("SUCCESS")
                .message("Email sent successfully")
                .build();
    }
}
