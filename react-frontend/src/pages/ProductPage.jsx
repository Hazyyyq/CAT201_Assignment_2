import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../style/ProductPage.module.css';

const ProductPage = () => {
    // 1. Get Product Type from URL
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type') || 'phone';

    // 2. Product Database
    const products = {
        'phone': {
            name: "KakiPhone 15 Pro",
            basePrice: 4999,
            desc: "The ultimate gaming phone with titanium finish.",
            img: "https://images.unsplash.com/photo-1732020883989-b22d66f8f1b9?w=600&auto=format&fit=crop&q=60"
        },
        'watch': {
            name: "KakiWatch Ultra",
            basePrice: 3299,
            desc: "Rugged and capable. Built for the wild.",
            img: "https://images.unsplash.com/photo-1594619272803-932ee1b5a0d9?w=600&auto=format&fit=crop&q=60"
        },
        'tablet': {
            name: "KakiPad Air",
            basePrice: 2899,
            desc: "Serious performance in a thin, light design.",
            img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2015&auto=format&fit=crop"
        }
    };

    const currentProduct = products[type] || products['phone'];

    // 3. State
    const [cartCount, setCartCount] = useState(0);
    const [color, setColor] = useState('Titanium Black');
    const [size, setSize] = useState('128');
    const [finalPrice, setFinalPrice] = useState(currentProduct.basePrice);

    // Added state for Mobile Menu to support Global CSS .sidebar logic
    const [isOpen, setIsOpen] = useState(false);

    // 4. Update Cart Count on Load
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('kakiCart')) || [];
        setCartCount(cart.length);
    }, []);

    // 5. Price Update Logic
    useEffect(() => {
        let extraCost = 0;
        if (size === "256") extraCost = 500;
        if (size === "512") extraCost = 1000;
        setFinalPrice(currentProduct.basePrice + extraCost);
    }, [size, currentProduct]);

    // 6. Add to Cart Function
    const addToCart = () => {
        const newItem = {
            id: Date.now(),
            name: currentProduct.name,
            price: finalPrice,
            img: currentProduct.img,
            color: color,
            size: size + "GB"
        };

        const cart = JSON.parse(localStorage.getItem('kakiCart')) || [];
        cart.push(newItem);
        localStorage.setItem('kakiCart', JSON.stringify(cart));
        setCartCount(cart.length);
        alert("Item added to bag!");
    };

    return (
        <div>
            {/* --- GLOBAL NAVIGATION --- */}
            <nav className="nav">
                {/* 1. Global Logo */}
                <Link to="/" className="logo">
                    KAKI GAMERZ<span className="dot"></span>
                </Link>

                {/* 2. Global Actions (Cart + Mobile Trigger + Links) */}
                <div className="nav-actions">
                    <div className="nav-links desktop-menu">
                        <Link to="/">Home</Link>
                    </div>

                    {/* 3. UPDATED CART: Text Style instead of Icon */}
                    <Link to="/cart" className={styles.cart}>
                        🛒 Cart (<span id="cart-count">{cartCount}</span>)
                    </Link>

                    {/* Global Sidebar Trigger */}
                    <div className="sidebar" onClick={() => setIsOpen(!isOpen)}>
                        <i className={`fa ${isOpen ? "fa-times" : "fa-bars"}`}></i>
                    </div>
                </div>
            </nav>

            {/* Global Mobile Menu Overlay */}
            <div className={`mobile-nav-overlay ${isOpen ? 'active' : ''}`}>
                <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
                <Link to="/cart" onClick={() => setIsOpen(false)}>Cart</Link>
            </div>

            {/* --- MODULAR MAIN CONTENT --- */}
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <img src={currentProduct.img} alt="Product" className={styles.img} />
                </div>

                <div className={styles.details}>
                    <h1>{currentProduct.name}</h1>
                    <div className={styles.priceTag}>RM {finalPrice}</div>
                    <p>{currentProduct.desc}</p>
                    <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #eee' }} />

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Color</label>
                        <select className={styles.input} value={color} onChange={(e) => setColor(e.target.value)}>
                            <option>Titanium Black</option>
                            <option>Titanium White</option>
                            <option>Deep Purple</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Storage</label>
                        <select className={styles.input} value={size} onChange={(e) => setSize(e.target.value)}>
                            <option value="128">128GB (Base)</option>
                            <option value="256">256GB (+RM 500)</option>
                            <option value="512">512GB (+RM 1000)</option>
                        </select>
                    </div>

                    <button className={styles.addBtn} onClick={addToCart}>
                        Add to Bag
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;