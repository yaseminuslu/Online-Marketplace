package com.example.onlinemarketplace.controller;

import com.example.onlinemarketplace.dto.FavoriteDto;
import com.example.onlinemarketplace.model.Favorite;
import com.example.onlinemarketplace.model.Product;
import com.example.onlinemarketplace.service.FavoriteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/favorites")
@CrossOrigin("http://localhost:3000")
public class FavoriteController {
    @Autowired
    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<FavoriteDto> addFavorite(@RequestParam Long userId, @RequestParam Long productId) {
        FavoriteDto favoriteDto = favoriteService.addFavorite(userId, productId);
        return ResponseEntity.ok(favoriteDto);
    }

    @DeleteMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Void> removeFavorite(@RequestParam Long userId, @RequestParam Long productId) {
        favoriteService.removeFavorite(userId, productId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user")
   @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<FavoriteDto>> getFavoritesByUser(@RequestParam Long userId) {
        List<FavoriteDto> favorites = favoriteService.getFavoritesByUser(userId);
        return ResponseEntity.ok(favorites);
    }
    @GetMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<List<Product>> getAllFavorites() {
        List<Product> favoriteProducts = favoriteService.allFavorites();
        return ResponseEntity.ok(favoriteProducts);
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<List<FavoriteDto>> searchFavoriteProducts(@RequestParam(required = false) Long userId,
            @RequestParam(required = false) String searchQuery) {
        List<FavoriteDto> products = favoriteService.searchFavoriteProducts(userId,searchQuery);
        return ResponseEntity.ok(products);
    }
}
