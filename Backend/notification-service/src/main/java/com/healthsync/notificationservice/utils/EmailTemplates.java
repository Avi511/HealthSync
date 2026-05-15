package com.healthsync.notificationservice.utils;

public class EmailTemplates {

    public static String appointmentTemplate(
            String patientName,
            String doctorName,
            String date
    ) {

        return "Hello " + patientName + ",\n\n"
                + "Your appointment with Dr. " + doctorName
                + " has been confirmed for " + date + ".\n\n"
                + "Thank you for using HealthSync.";
    }

    public static String welcomeTemplate(String name) {

        return "Welcome " + name + " to HealthSync!\n\n"
                + "Your account has been created successfully.";
    }
}
