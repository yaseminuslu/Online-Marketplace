package com.example.onlinemarketplace.mapper;

import com.example.onlinemarketplace.dto.UserDto;
import com.example.onlinemarketplace.dto.UserInputDto;
import com.example.onlinemarketplace.model.Role;
import com.example.onlinemarketplace.model.User;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;
@Component
public class UserMapper {
    private  final PasswordEncoder passwordEncoder;

    public UserMapper(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public UserDto toUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        userDto.setPhoneNumber(user.getPhoneNumber());
        userDto.setFullname(user.getName() + " " + user.getSurname());
        userDto.setRoles(user.getRoles().stream().map(Role::getName).collect(Collectors.toSet()));
        return userDto;
    }

    public User toUser(UserInputDto userInputDto) {
        User user = new User();
        user.setUsername(userInputDto.getUsername());
        user.setPassword(passwordEncoder.encode(userInputDto.getPassword())); // Şifreyi ayarla
        user.setEmail(userInputDto.getEmail());
        user.setName(userInputDto.getName());
        user.setSurname(userInputDto.getSurname());
        user.setPhoneNumber(userInputDto.getPhoneNumber());
        user.setRoles(userInputDto.getRoles().stream().map(Role::fromString).collect(Collectors.toSet()));
        return user;
    }
    public void updateUserFromDto(UserInputDto userInputDto, User user) {
        user.setUsername(userInputDto.getUsername());
        user.setEmail(userInputDto.getEmail());
        user.setPassword(passwordEncoder.encode(userInputDto.getPassword()));
        user.setName(userInputDto.getName());
        user.setSurname(userInputDto.getSurname());
        user.setPhoneNumber(userInputDto.getPhoneNumber());
        user.setRoles(userInputDto.getRoles().stream().map(Role::fromString).collect(Collectors.toSet()));
    }


}
