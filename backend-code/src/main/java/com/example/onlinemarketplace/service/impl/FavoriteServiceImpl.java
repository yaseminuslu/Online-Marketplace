package com.example.onlinemarketplace.service.impl;

import com.example.onlinemarketplace.dto.FavoriteDto;
import com.example.onlinemarketplace.mapper.FavoriteMapper;
import com.example.onlinemarketplace.model.Favorite;
import com.example.onlinemarketplace.model.Product;
import com.example.onlinemarketplace.model.User;
import com.example.onlinemarketplace.repository.FavoriteRepository;
import com.example.onlinemarketplace.repository.ProductRepository;
import com.example.onlinemarketplace.repository.UserRepository;
import com.example.onlinemarketplace.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoriteServiceImpl implements FavoriteService {
    @Autowired
    private final FavoriteRepository favoriteRepository;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final ProductRepository productRepository;
    @Autowired
    private final FavoriteMapper favoriteMapper;

    public FavoriteServiceImpl(FavoriteRepository favoriteRepository, UserRepository userRepository, ProductRepository productRepository, FavoriteMapper favoriteMapper) {
        this.favoriteRepository = favoriteRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.favoriteMapper = favoriteMapper;
    }
    @Override
    public FavoriteDto addFavorite(Long userId, Long productId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Favorite existingFavorite = favoriteRepository.findByUserAndProductId(user, productId);

        if (existingFavorite == null) {
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            Favorite newFavorite = new Favorite();
            newFavorite.setUser(user);
            newFavorite.setProduct(product);

            Favorite savedFavorite = favoriteRepository.save(newFavorite);

            // Yeni favoriyi DTO'ya dönüştür
            return favoriteMapper.toFavoriteDto(savedFavorite);
        }

        // Var olan favoriyi DTO'ya dönüştür
        return favoriteMapper.toFavoriteDto(existingFavorite);
    }
    @Override
    public void removeFavorite(Long userId, Long productId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Kullanıcının ürün ID'sine sahip favorisini bul
        Favorite existingFavorite = favoriteRepository.findByUserAndProductId(user, productId);

        if (existingFavorite != null) {
            // Favoriyi sil
            favoriteRepository.delete(existingFavorite);
        }
    }
    @Override
    public List<FavoriteDto> getFavoritesByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Favorite> favorites = favoriteRepository.findByUser(user);

        return favorites.stream()
                .map(favoriteMapper::toFavoriteDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<Product> allFavorites() {
        List<Favorite> favorites = favoriteRepository.findAll();

        return favorites.stream()
                .map(Favorite::getProduct)
                .collect(Collectors.toList());
    }
    @Override
    public List<FavoriteDto> searchFavoriteProducts(Long userId,String searchQuery) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Favorite> favorites = favoriteRepository.findByUser(user); // Tüm favori ürünleri getir

        List<Favorite> filteredFavoriteProducts = favorites.stream()
                .filter(favoriteProduct ->
                        favoriteProduct.getProduct().getName().toLowerCase().contains(searchQuery.toLowerCase()) ||
                                favoriteProduct.getProduct().getCategory().toLowerCase().contains(searchQuery.toLowerCase()) ||
                                    favoriteProduct.getProduct().getSeller().getName().toLowerCase().contains(searchQuery.toLowerCase()))
                                        .collect(Collectors.toList());

        return filteredFavoriteProducts.stream()
                .map(favoriteMapper::toFavoriteDto)
                .collect(Collectors.toList());
    }
}
