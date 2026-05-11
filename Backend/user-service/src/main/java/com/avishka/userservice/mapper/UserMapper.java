package com.avishka.userservice.mapper;

import com.avishka.userservice.dto.UserRequest;
import com.avishka.userservice.dto.UserResponse;
import com.avishka.userservice.entity.User;

public class UserMapper {
    public static User toEntity(UserRequest userRequest) {
        return User.builder()
                .firstName(userRequest.getFirstName())
                .lastName(userRequest.getLastName())
                .email(userRequest.getEmail())
                .phone(userRequest.getPhone())
                .password(userRequest.getPassword())
                .address(userRequest.getAddress())
                .build();
    }

    public static UserResponse toResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .address(user.getAddress())
                .build();
    }
}
