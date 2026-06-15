package com.productcatalog.backend.service;

import com.productcatalog.backend.entity.Product;

import com.productcatalog.backend.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // ADD PRODUCT

    public Product addProduct(
            Product product
    ){

        return productRepository
                .save(product);
    }

    // GET ALL PRODUCTS

    public List<Product> getAllProducts(){

        return productRepository
                .findAll();
    }

    // DELETE PRODUCT

    public void deleteProduct(
            Long id
    ){

        productRepository
                .deleteById(id);
    }

    // GET PRODUCT BY ID

    public Product getProductById(
            Long id
    ){

        return productRepository
                .findById(id)
                .orElseThrow(

                        () -> new RuntimeException(

                                "Product Not Found"
                        )
                );
    }

    // UPDATE PRODUCT

    public Product updateProduct(

            Long id,

            Product updatedProduct
    ){

        Product product =
                getProductById(id);

        product.setName(
                updatedProduct.getName()
        );

        product.setBrand(
                updatedProduct.getBrand()
        );

        product.setPrice(
                updatedProduct.getPrice()
        );

        product.setImageUrl(
                updatedProduct.getImageUrl()
        );

        product.setStock(
                updatedProduct.getStock()
        );

        product.setCategory(
                updatedProduct.getCategory()
        );

        return productRepository
                .save(product);
    }
}