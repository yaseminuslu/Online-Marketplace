package com.example.onlinemarketplace.repository;

import com.example.onlinemarketplace.model.Product;
import com.example.onlinemarketplace.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SellerRepository extends JpaRepository<Seller,Long> {
    List<Seller> findByNameContainingIgnoreCase(String name);
    Seller findByProducts_Id(Long productId);
}
