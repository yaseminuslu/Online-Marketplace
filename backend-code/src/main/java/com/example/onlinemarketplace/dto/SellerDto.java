package com.example.onlinemarketplace.dto;

import com.example.onlinemarketplace.model.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SellerDto {
    private Long id;
    private String name;
    private String address;
    private String phoneNumber;
    private String email;
}
