package com.example.onlinemarketplace.dto;

import lombok.*;

import java.io.Serializable;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class UserDto implements Serializable {

    private Long id;
    private String username;
    private String email;
    private String phoneNumber;
    private Set<String> roles;
    private String fullname;
}

