package com.productcatalog.backend.controller;

import com.productcatalog.backend.entity.Product;

import com.productcatalog.backend.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin("*")

public class ProductController {

    @Autowired
    private ProductService productService;

    // ADD PRODUCT

    @PostMapping("/add")

    public Product addProduct(
            @RequestBody Product product
    ){

        return productService
                .addProduct(product);
    }

    // GET ALL PRODUCTS

    @GetMapping("/all")

    public List<Product> getAllProducts(){

        return productService
                .getAllProducts();
    }

    // GET PRODUCT BY ID

    @GetMapping("/{id}")

    public Product getProductById(
            @PathVariable Long id
    ){

        return productService
                .getProductById(id);
    }

    // DELETE PRODUCT

    @DeleteMapping("/delete/{id}")

    public String deleteProduct(
            @PathVariable Long id
    ){

        productService.deleteProduct(id);

        return "Product Deleted";
    }

    // UPDATE PRODUCT

    @PutMapping("/update/{id}")

    public Product updateProduct(

            @PathVariable Long id,

            @RequestBody Product updatedProduct
    ){

        Product product =
                productService
                .getProductById(id);

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

        return productService
                .addProduct(product);
    }
}