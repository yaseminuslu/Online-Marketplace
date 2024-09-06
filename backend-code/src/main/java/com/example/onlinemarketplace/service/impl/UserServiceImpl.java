package com.example.onlinemarketplace.service.impl;

import com.example.onlinemarketplace.dto.UserDto;
import com.example.onlinemarketplace.dto.UserInputDto;
import com.example.onlinemarketplace.excepiton.ResourceNotFoundException;
import com.example.onlinemarketplace.mapper.UserMapper;
import com.example.onlinemarketplace.model.User;
import com.example.onlinemarketplace.repository.UserRepository;
import com.example.onlinemarketplace.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Transactional
    @Override
    public UserDto createUser(UserInputDto userInputDto) {
        User user = userMapper.toUser(userInputDto);
        return userMapper.toUserDto(userRepository.save(user));
    }

    @Transactional(readOnly = true)
    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toUserDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    @Override
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
        return userMapper.toUserDto(user);
    }

    @Override
    public UserDto updateUser(Long id, UserInputDto userInputDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
        userMapper.updateUserFromDto(userInputDto, user);
        return userMapper.toUserDto(userRepository.save(user));
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
        userRepository.delete(user);
    }

    @Override
    public List<UserDto> searchUsers(String searchQuery) {
        if (searchQuery == null || searchQuery.trim().isEmpty()) {
            System.out.println("boş liste");
            return Collections.emptyList();
        }
        List<User> allUsers = userRepository.findAll();
        return allUsers.stream()
                .filter(user ->
                        user.getName().toLowerCase().contains(searchQuery.toLowerCase()) ||
                                user.getSurname().toLowerCase().contains(searchQuery.toLowerCase()) ||
                                user.getUsername().toLowerCase().contains(searchQuery.toLowerCase()) ||
                                user.getEmail().toLowerCase().contains(searchQuery.toLowerCase()))
                .map(userMapper::toUserDto)
                .collect(Collectors.toList());
    }
}
