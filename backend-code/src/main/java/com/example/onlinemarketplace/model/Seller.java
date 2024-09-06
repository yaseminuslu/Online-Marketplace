package com.example.onlinemarketplace.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "sellers")
public class Seller implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name",unique = true,nullable = false)
    private String name;

    @Column(name = "address",nullable = false)
    private String address;

    @Column(name = "phone_number",unique = true,nullable = false)
    private String phoneNumber;

    @Column(name = "email",unique = true,nullable = false)
    private String email;

    @OneToMany(mappedBy = "seller", orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    @JsonIgnoreProperties({"seller"})
    private Set<Product> products = new HashSet<>();


}
