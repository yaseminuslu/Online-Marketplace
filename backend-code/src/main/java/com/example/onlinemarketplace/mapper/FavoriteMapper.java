package com.example.onlinemarketplace.mapper;

import com.example.onlinemarketplace.dto.FavoriteDto;
import com.example.onlinemarketplace.model.Favorite;
import org.springframework.stereotype.Component;

@Component
public class FavoriteMapper {
    public FavoriteDto toFavoriteDto(Favorite favorite) {
        if (favorite == null || favorite.getProduct() == null) {
            return null;
        }
        return new FavoriteDto(
                favorite.getId(),
                favorite.getUser().getId(),
                favorite.getProduct().getId(),
                favorite.getProduct().getName(),
                favorite.getProduct().getImageUrl()
        );
    }
}
