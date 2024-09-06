package com.example.onlinemarketplace.service;

import com.example.onlinemarketplace.dto.FavoriteDto;
import com.example.onlinemarketplace.model.Favorite;
import com.example.onlinemarketplace.model.Product;

import java.util.List;

public interface FavoriteService {
    FavoriteDto addFavorite(Long userId, Long productId);
    void removeFavorite(Long userId, Long productId);
    List<FavoriteDto> getFavoritesByUser(Long userId);
    List<Product> allFavorites();
    List<FavoriteDto> searchFavoriteProducts(Long userId,String searchQuery);
}
