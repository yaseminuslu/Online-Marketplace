package com.example.onlinemarketplace.service;

import com.example.onlinemarketplace.model.BlackList;

import java.util.List;

public interface BlackListService {
    BlackList addSellerToBlackList(Long userId, Long sellerId, String reason);
    void removeSellerFromBlackList(Long userId, Long sellerId);
    List<BlackList> getAllBlackListEntries();
    List<BlackList> searchBlackList(String searchQuery);
    List<BlackList> getBlackListByUser(Long userId);
}
