package com.example.onlinemarketplace.service.impl;

import com.example.onlinemarketplace.excepiton.ResourceNotFoundException;
import com.example.onlinemarketplace.model.BlackList;
import com.example.onlinemarketplace.model.Seller;
import com.example.onlinemarketplace.model.User;
import com.example.onlinemarketplace.repository.BlackListRepository;
import com.example.onlinemarketplace.repository.SellerRepository;
import com.example.onlinemarketplace.repository.UserRepository;
import com.example.onlinemarketplace.service.BlackListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlackListServiceImpl implements BlackListService {

    private final BlackListRepository blackListRepository;
    private final SellerRepository sellerRepository;
    private final UserRepository userRepository;

    @Autowired
    public BlackListServiceImpl(BlackListRepository blackListRepository, SellerRepository sellerRepository, UserRepository userRepository) {
        this.blackListRepository = blackListRepository;
        this.sellerRepository = sellerRepository;
        this.userRepository = userRepository;
    }

    @Override
    public BlackList addSellerToBlackList(Long userId, Long sellerId, String reason) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Seller seller = sellerRepository.findById(sellerId)
                .orElseThrow(() -> new ResourceNotFoundException("Seller not found with id: " + sellerId));

        BlackList existingEntry = blackListRepository.findByUserAndSellerAndReason(user, seller, reason);

        if (existingEntry == null) {
            BlackList newBlackListEntry = new BlackList();
            newBlackListEntry.setUser(user);
            newBlackListEntry.setSeller(seller);
            newBlackListEntry.setReason(reason);
            return blackListRepository.save(newBlackListEntry);
        }

        return existingEntry;
    }

    @Override
    public void removeSellerFromBlackList(Long userId, Long sellerId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Seller seller = sellerRepository.findById(sellerId)
                .orElseThrow(() -> new ResourceNotFoundException("Seller not found with id: " + sellerId));

        List<BlackList> blackListEntries = blackListRepository.findByUserAndSeller(user, seller);
        blackListRepository.deleteAll(blackListEntries);
    }

    @Override
    public List<BlackList> getAllBlackListEntries() {
        return blackListRepository.findAll();
    }
    @Override
    public List<BlackList> searchBlackList(String searchQuery) {
        List<BlackList> allBlackList = blackListRepository.findAll();

        return allBlackList.stream()
                .filter(blackList ->
                        blackList.getSeller().getName().toLowerCase().contains(searchQuery.toLowerCase()) ||
                                blackList.getReason().toLowerCase().contains(searchQuery.toLowerCase()))
                .collect(Collectors.toList());
    }

    @Override
    public List<BlackList> getBlackListByUser(Long userId) {
        User user=userRepository.findById(userId).orElseThrow(()->new RuntimeException("User not found"));
        List<BlackList> blackLists = blackListRepository.findByUser(user);

        return blackLists;
    }
}