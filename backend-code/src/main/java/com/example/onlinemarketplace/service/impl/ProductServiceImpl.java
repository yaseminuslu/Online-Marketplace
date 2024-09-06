package com.example.onlinemarketplace.service.impl;

import com.example.onlinemarketplace.dto.ProductDto;
import com.example.onlinemarketplace.model.Product;
import com.example.onlinemarketplace.model.Seller;
import com.example.onlinemarketplace.repository.ProductRepository;
import com.example.onlinemarketplace.repository.SellerRepository;
import com.example.onlinemarketplace.service.ProductService;
import com.example.onlinemarketplace.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private final ProductRepository productRepository;
    @Autowired
    private final SellerService sellerService;
    @Autowired
    private final FileService fileService;
    @Autowired
    private final SellerRepository sellerRepository;

    public ProductServiceImpl(ProductRepository productRepository, SellerService sellerService, FileService fileService, SellerRepository sellerRepository) {
        this.productRepository = productRepository;
        this.sellerService = sellerService;
        this.fileService = fileService;
        this.sellerRepository = sellerRepository;
    }

    @Override
    public Product createProduct(ProductDto productDto) {
        Product product = new Product();
        product.setName(productDto.getName());
        product.setPrice(productDto.getPrice());
        product.setDescription(productDto.getDescription());
        product.setCategory(productDto.getCategory());

        if (productDto.getImage() != null && !productDto.getImage().isEmpty()) {
            String imageUrl = "/uploads/" + fileService.saveFile(productDto.getImage());
            product.setImageUrl(imageUrl);
        }

        Seller seller = sellerService.getSellerById(productDto.getSellerId());
        product.setSeller(seller);

        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Override
    public Product updateProduct(Long id, ProductDto productDto) {
        Product product = getProductById(id);
        product.setName(productDto.getName());
        product.setPrice(productDto.getPrice());
        product.setDescription(productDto.getDescription());
        product.setCategory(productDto.getCategory());

        if (productDto.getImage() != null && !productDto.getImage().isEmpty()) {
            String imageUrl = "/uploads/" + fileService.saveFile(productDto.getImage());
            product.setImageUrl(imageUrl);
        }

        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
    @Override
    public List<Product> searchProduct(String searchQuery) {
        List<Product> allProducts = productRepository.findAll();

        List<Product> filteredProducts = allProducts.stream()
                .filter(product ->
                        product.getName().toLowerCase().contains(searchQuery.toLowerCase()) ||
                                product.getCategory().toLowerCase().contains(searchQuery.toLowerCase()) ||
                                product.getSeller().getName().contains(searchQuery.toLowerCase())).collect(Collectors.toList());

        return filteredProducts;
    }

    @Override
    public Seller getProductSeller(Long productId) {
        Seller seller= sellerRepository.findByProducts_Id(productId);
        return seller;
    }

}
