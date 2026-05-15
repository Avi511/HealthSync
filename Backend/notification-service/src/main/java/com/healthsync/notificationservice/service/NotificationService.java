package com.healthsync.notificationservice.service;

import com.healthsync.notificationservice.dto.EmailRequest;
import com.healthsync.notificationservice.dto.NotificationResponse;

public interface NotificationService {

    NotificationResponse sendEmail(EmailRequest request);
}
