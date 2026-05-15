package com.healthsync.notificationservice.dto;

public class NotificationResponse {

    private String status;
    private String message;

    public NotificationResponse() {
    }

    public NotificationResponse(String status, String message) {
        this.status = status;
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public static NotificationResponseBuilder builder() {
        return new NotificationResponseBuilder();
    }

    public static class NotificationResponseBuilder {
        private String status;
        private String message;

        NotificationResponseBuilder() {
        }

        public NotificationResponseBuilder status(String status) {
            this.status = status;
            return this;
        }

        public NotificationResponseBuilder message(String message) {
            this.message = message;
            return this;
        }

        public NotificationResponse build() {
            return new NotificationResponse(this.status, this.message);
        }
    }
}
