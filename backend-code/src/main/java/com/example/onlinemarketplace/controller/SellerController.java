package com.example.onlinemarketplace.controller;

import com.example.onlinemarketplace.dto.SellerDto;
import com.example.onlinemarketplace.model.Seller;
import com.example.onlinemarketplace.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/sellers")
@CrossOrigin("http://localhost:3000")
public class SellerController {
    private final SellerService sellerService;

    @Autowired
    public SellerController(SellerService sellerService) {
        this.sellerService = sellerService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Seller> createSeller(@RequestBody SellerDto sellerDto) {
        Seller seller = sellerService.createSeller(sellerDto);
        return ResponseEntity.ok(seller);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Seller>> getAllSellers() {
        List<Seller> sellers = sellerService.getAllSellers();
        return ResponseEntity.ok(sellers);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Seller> getSellerById(@PathVariable Long id) {
        Seller seller = sellerService.getSellerById(id);
        return ResponseEntity.ok(seller);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Seller> updateSeller(@PathVariable Long id, @RequestBody SellerDto sellerDto) {
        Seller updatedSeller = sellerService.updateSeller(id, sellerDto);
        return ResponseEntity.ok(updatedSeller);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteSeller(@PathVariable Long id) {
        sellerService.deleteSeller(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
   @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Seller>> searchSellersByName(@RequestParam String searchQuery) {
        List<Seller> sellers = sellerService.searchSellersByName(searchQuery);
        return ResponseEntity.ok(sellers);
    }
}
