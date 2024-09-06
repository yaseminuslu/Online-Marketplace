package com.example.onlinemarketplace.service;

import com.example.onlinemarketplace.dto.ProductDto;
import com.example.onlinemarketplace.model.Product;
import com.example.onlinemarketplace.model.Seller;

import java.util.List;

public interface ProductService {
    Product createProduct(ProductDto productDto);
    List<Product> getAllProducts();
    Product getProductById(Long id);
    Product updateProduct(Long id, ProductDto productDto);
    void deleteProduct(Long id);
    List<Product> searchProduct(String searchQuery);
    Seller getProductSeller(Long producId);
}
