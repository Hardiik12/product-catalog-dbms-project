package com.productcatalog.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "products")

public class Product {

    @Id
    @GeneratedValue(
            strategy =
            GenerationType.IDENTITY
    )

    private Long id;

    private String name;

    private String brand;

    private Double price;

    private String imageUrl;

    private Integer stock;

    private String category;

    public Product() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(
            String name
    ) {
        this.name = name;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(
            String brand
    ) {
        this.brand = brand;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(
            Double price
    ) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(
            String imageUrl
    ) {
        this.imageUrl = imageUrl;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(
            Integer stock
    ) {
        this.stock = stock;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(
            String category
    ) {
        this.category = category;
    }
}