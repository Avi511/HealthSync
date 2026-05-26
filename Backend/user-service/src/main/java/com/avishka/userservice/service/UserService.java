package com.avishka.userservice.service;

import com.avishka.userservice.dto.LoginRequest;
import com.avishka.userservice.dto.UserRequest;
import com.avishka.userservice.dto.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest userRequest);

    List<UserResponse> getAllUsers();

    UserResponse getUserById(Long id);

    UserResponse updateUser(Long id, UserRequest userRequest);

    void deleteUser(Long id);

    UserResponse login(LoginRequest loginRequest);

    UserResponse verifyOtp(String email, String otp);

    void resendOtp(String email);

    UserResponse googleLogin(String tokenId) throws Exception;

}
