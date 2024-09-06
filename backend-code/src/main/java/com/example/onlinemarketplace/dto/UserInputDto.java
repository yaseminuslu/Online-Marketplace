package com.example.onlinemarketplace.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserInputDto implements Serializable {

    @NotNull
    @Size(min = 5,max = 15,message = "The username must consist of at least 5 and at most 15 characters.")
    private String username;

    @NotNull
    @Size(min = 8, max = 20)
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*$")
    private String password;

    @NotNull
    @Email(message = "Please enter a valid e-mail address.")
    private String email;

    @NotNull
    @Size(min = 2, max = 25)
    private String name;

    @NotNull
    @Size(min = 2, max = 25)
    private String surname;

    @NotNull
    @Pattern(regexp = "^\\d{10}$", message = "The phone number must be 10 digits long and consist of numbers only.")
    private String phoneNumber;

    @NotNull
    private Set<String> roles;

}
