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
        System.out.println("📬 Attempting to send email to: " + request.getTo());
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(request.getTo());
            mailMessage.setSubject(request.getSubject());
            mailMessage.setText(request.getMessage());
            mailMessage.setFrom("health.sync.26@gmail.com");

            mailSender.send(mailMessage);
            System.out.println("✅ Email sent successfully to " + request.getTo());
            return NotificationResponse.builder()
                    .status("SUCCESS")
                    .message("Email sent successfully")
                    .build();
        } catch (Exception e) {
            System.err.println("❌ ERROR: Failed to send email to " + request.getTo());
            e.printStackTrace();
            return NotificationResponse.builder()
                    .status("FAILED")
                    .message("Failed to send email: " + e.getMessage())
                    .build();
        }
    }
}
