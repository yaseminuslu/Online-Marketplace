package com.example.onlinemarketplace.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {

    private Long id;
    private String name;
    private Double price;
    private String description;
    private String category;
    private MultipartFile image; // MultipartFile olarak image

    private Long sellerId;
}
