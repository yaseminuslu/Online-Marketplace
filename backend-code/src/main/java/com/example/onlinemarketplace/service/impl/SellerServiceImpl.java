package com.example.onlinemarketplace.service.impl;

import com.example.onlinemarketplace.dto.SellerDto;
import com.example.onlinemarketplace.excepiton.ResourceNotFoundException;
import com.example.onlinemarketplace.model.Seller;
import com.example.onlinemarketplace.repository.SellerRepository;
import com.example.onlinemarketplace.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SellerServiceImpl implements SellerService {
    private final SellerRepository sellerRepository;

    @Autowired
    public SellerServiceImpl(SellerRepository sellerRepository) {
        this.sellerRepository = sellerRepository;
    }

    @Override
    public Seller createSeller(SellerDto sellerDto) {
        Seller seller = new Seller();
        seller.setName(sellerDto.getName());
        seller.setAddress(sellerDto.getAddress());
        seller.setPhoneNumber(sellerDto.getPhoneNumber());
        seller.setEmail(sellerDto.getEmail());

        return sellerRepository.save(seller);
    }

    @Override
    public List<Seller> getAllSellers() {
        return sellerRepository.findAll();
    }

    @Override
    public Seller getSellerById(Long id) {
        return sellerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Seller not found with id: " + id));
    }

    @Override
    public Seller updateSeller(Long id, SellerDto sellerDto) {
        Seller seller = getSellerById(id);
        seller.setName(sellerDto.getName());
        seller.setAddress(sellerDto.getAddress());
        seller.setPhoneNumber(sellerDto.getPhoneNumber());
        seller.setEmail(sellerDto.getEmail());

        return sellerRepository.save(seller);
    }

    @Override
    public void deleteSeller(Long id) {
        Seller seller = getSellerById(id);
        sellerRepository.delete(seller);
    }

    @Override
    public List<Seller> searchSellersByName(String searchQuery) {
        return sellerRepository.findByNameContainingIgnoreCase(searchQuery);
    }

}
