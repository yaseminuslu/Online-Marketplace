package com.example.onlinemarketplace.service;

import com.example.onlinemarketplace.dto.SellerDto;
import com.example.onlinemarketplace.model.Seller;

import java.util.List;

public interface SellerService {
    Seller createSeller(SellerDto sellerDto);
    List<Seller> getAllSellers();
    Seller getSellerById(Long id);
    Seller updateSeller(Long id, SellerDto sellerDto);
    void deleteSeller(Long id);
    List<Seller> searchSellersByName(String searchQuery);

}
