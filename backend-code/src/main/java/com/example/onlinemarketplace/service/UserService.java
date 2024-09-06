package com.example.onlinemarketplace.service;

import com.example.onlinemarketplace.dto.UserDto;
import com.example.onlinemarketplace.dto.UserInputDto;
import com.example.onlinemarketplace.model.User;

import java.util.List;

public interface UserService {
    UserDto createUser(UserInputDto userInputDto);
    List<UserDto> getAllUsers();
    UserDto getUserById(Long id);
    UserDto updateUser(Long id, UserInputDto userInputDto);
    void deleteUser(Long id);
    List<UserDto> searchUsers(String searchQuery);
}
