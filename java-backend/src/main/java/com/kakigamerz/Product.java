package com.kakigamerz;

public class Product {
    public long id;
    public String name;
    public String category;
    public double price;
    public int stock;
    public String desc;
    public String image;

    public Object specs;
    public Object colors;

    // Default constructor is enough for GSON
    public Product() {
    }

    public Product(long id, String name, String category, double price, int stock, String desc, String image, Object specs, Object colors) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
        this.desc = desc;
        this.image = image;
        this.specs = specs;
        this.colors = colors;
    }
}