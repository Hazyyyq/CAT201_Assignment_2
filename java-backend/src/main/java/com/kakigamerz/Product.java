package com.kakigamerz;

import java.util.List;

public class Product {
    
    private long id;
    private String name;
    private String category;
    private double price;
    private Double oldPrice;
    private String badge;
    private int stock;
    private String desc;
    private String image;
    private List<Spec> specs;
    private List<Color> colors;

   
    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public Double getOldPrice() { return oldPrice; }
    public void setOldPrice(Double oldPrice) { this.oldPrice = oldPrice; }

    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }

    public int getStock() { return stock; }
    public void setStock(int stock) { this.stock = stock; }

    public String getDesc() { return desc; }
    public void setDesc(String desc) { this.desc = desc; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public List<Spec> getSpecs() { return specs; }
    public void setSpecs(List<Spec> specs) { this.specs = specs; }

    public List<Color> getColors() { return colors; }
    public void setColors(List<Color> colors) { this.colors = colors; }

   
    public static class Spec {
        public String icon;
        public String label;
    }

    public static class Color {
        public String name;
        public String hex;
    }
}
