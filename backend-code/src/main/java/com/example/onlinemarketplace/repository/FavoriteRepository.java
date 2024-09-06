package com.example.onlinemarketplace.repository;

import com.example.onlinemarketplace.dto.FavoriteDto;
import com.example.onlinemarketplace.model.Favorite;
import com.example.onlinemarketplace.model.Product;
import com.example.onlinemarketplace.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite,Long> {
    List<Favorite> findByUser(User user);
    Favorite findByUserAndProductId(User user, Long productId);
    @Query("SELECT f FROM Favorite f")
    List<Favorite> findAllFavoriteProducts();
}
