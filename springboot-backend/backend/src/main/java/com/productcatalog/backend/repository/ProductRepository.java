package com.productcatalog.backend.repository;

import com.productcatalog.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository
        extends JpaRepository<Product, Long> {
}