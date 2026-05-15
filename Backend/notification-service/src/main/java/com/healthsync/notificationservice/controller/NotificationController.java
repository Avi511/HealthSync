package com.healthsync.notificationservice.controller;

import com.healthsync.notificationservice.dto.EmailRequest;
import com.healthsync.notificationservice.dto.NotificationResponse;
import com.healthsync.notificationservice.service.NotificationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("/email")
    public ResponseEntity<NotificationResponse> sendEmail(
            @Valid @RequestBody EmailRequest request
    ) {

        return ResponseEntity.ok(
                notificationService.sendEmail(request)
        );
    }
}
