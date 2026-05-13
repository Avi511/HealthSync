package com.healthsync.authservice.service;

import com.healthsync.authservice.dto.AuthRequest;
import com.healthsync.authservice.dto.AuthResponse;
import com.healthsync.authservice.dto.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(AuthRequest request);
}
