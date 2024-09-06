package com.example.onlinemarketplace.model;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@RequiredArgsConstructor
public enum Role {
        USER,
        ADMIN;

        public String getName() {
            return name();
        }

        public static Role fromString(String role) {
            for (Role r : Role.values()) {
                if (r.name().equalsIgnoreCase(role)) {
                    return r;
                }
            }
            throw new IllegalArgumentException("No enum constant with name " + role);
        }


}
