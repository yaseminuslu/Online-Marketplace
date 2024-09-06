package com.example.onlinemarketplace.repository;

import com.example.onlinemarketplace.model.BlackList;
import com.example.onlinemarketplace.model.Seller;
import com.example.onlinemarketplace.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlackListRepository extends JpaRepository<BlackList,Long> {

    List<BlackList> findByUserAndSeller(User user, Seller seller);
    BlackList findByUserAndSellerAndReason(User user, Seller seller, String reason);
    List<BlackList> findByUser(User user);
}
