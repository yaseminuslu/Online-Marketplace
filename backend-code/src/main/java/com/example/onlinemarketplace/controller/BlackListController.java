package com.example.onlinemarketplace.controller;

import com.example.onlinemarketplace.model.BlackList;
import com.example.onlinemarketplace.model.Product;
import com.example.onlinemarketplace.service.BlackListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/blacklists")
@CrossOrigin("http://localhost:3000")
public class BlackListController {
    private final BlackListService blackListService;

    @Autowired
    public BlackListController(BlackListService blackListService) {
        this.blackListService = blackListService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<BlackList> addSellerToBlackList(
            @RequestParam Long userId,
            @RequestParam Long sellerId,
            @RequestParam String reason) {
        BlackList blackListEntry = blackListService.addSellerToBlackList(userId, sellerId, reason);
        return ResponseEntity.ok(blackListEntry);
    }

    @DeleteMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Void> removeSellerFromBlackList(
            @RequestParam Long userId,
            @RequestParam Long sellerId) {
        blackListService.removeSellerFromBlackList(userId, sellerId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<BlackList>> getAllBlackListEntries() {
        List<BlackList> blackListEntries = blackListService.getAllBlackListEntries();
        return ResponseEntity.ok(blackListEntries);
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<List<BlackList>> searchBlackList(
            @RequestParam(required = false) String searchQuery) {

        List<BlackList> blackList = blackListService.searchBlackList(searchQuery);
        return ResponseEntity.ok(blackList);
    }
    @GetMapping("/user")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<List<BlackList>> getBlackListByUser( @RequestParam(required = false) Long userId){
        List<BlackList> blackLists= blackListService.getBlackListByUser(userId);
        return ResponseEntity.ok(blackLists);
    }
}
