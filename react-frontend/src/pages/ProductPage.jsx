import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../style/ProductPage.module.css';

const ProductPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type') || 'phone';

    // Enhanced Product Data with Tech Specs & Hex Colors
    const products = {
        'phone': {
            name: "KakiPhone 15 Pro",
            basePrice: 4999,
            desc: "The ultimate gaming phone. Titanium finish. 144Hz OLED. Zero Lag.",
            img: "https://images.unsplash.com/photo-1732020883989-b22d66f8f1b9?w=600&auto=format&fit=crop&q=60",
            specs: [
                { icon: "fa-microchip", label: "A17 Pro Chip" },
                { icon: "fa-bolt", label: "144Hz OLED" },
                { icon: "fa-shield", label: "Titanium Body" }
            ],
            colors: [
                { name: 'Titanium Black', hex: '#2c2c2c' },
                { name: 'Titanium White', hex: '#f0f0f0' },
                { name: 'Deep Purple', hex: '#483D8B' }
            ]
        },
        'watch': {
            name: "KakiWatch Ultra",
            basePrice: 3299,
            desc: "Rugged. Capable. Built for the wild. Your HUD in real life.",
            img: "https://images.unsplash.com/photo-1594619272803-932ee1b5a0d9?w=600&auto=format&fit=crop&q=60",
            specs: [
                { icon: "fa-map", label: "Dual-Freq GPS" },
                { icon: "fa-heartbeat", label: "ECG Sensor" },
                { icon: "fa-battery-full", label: "60h Battery" }
            ],
            colors: [
                { name: 'Alpine Loop', hex: '#df7c2e' },
                { name: 'Ocean Blue', hex: '#1a3b5d' },
                { name: 'Midnight', hex: '#1c1c1c' }
            ]
        },
        'tablet': {
            name: "KakiPad Air",
            basePrice: 2899,
            desc: "Serious performance. Thin design. Bigger screen, better headshots.",
            img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2015&auto=format&fit=crop",
            specs: [
                { icon: "fa-pencil", label: "Stylus Support" },
                { icon: "fa-expand", label: "13-inch Retina" },
                { icon: "fa-wifi", label: "Wi-Fi 6E" }
            ],
            colors: [
                { name: 'Space Grey', hex: '#5e5e5e' },
                { name: 'Starlight', hex: '#f9f3ee' },
                { name: 'Sky Blue', hex: '#8ab4d6' }
            ]
        }
    };

    const currentProduct = products[type] || products['phone'];

    const [cartCount, setCartCount] = useState(0);
    const [color, setColor] = useState(currentProduct.colors[0].name);
    const [size, setSize] = useState('128');
    const [finalPrice, setFinalPrice] = useState(currentProduct.basePrice);
    const [isOpen, setIsOpen] = useState(false);

    // Mouse Tracking Logic
    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = e.clientX;
            const y = e.clientY;
            document.documentElement.style.setProperty('--mouse-x', `${x}px`);
            document.documentElement.style.setProperty('--mouse-y', `${y}px`);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('kakiCart')) || [];
        setCartCount(cart.length);
    }, []);

    useEffect(() => {
        let extraCost = 0;
        if (size === "256") extraCost = 500;
        if (size === "512") extraCost = 1000;
        setFinalPrice(currentProduct.basePrice + extraCost);
    }, [size, currentProduct]);

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
        alert("Item added to your bag.");
    };

    return (
        <div className={styles.pageWrapper}>
            {/* 1. TEXTURE & SPOTLIGHT LAYERS */}
            <div className={styles.noiseOverlay}></div>
            <div className={styles.interactiveSpotlight}></div>
            <div className={styles.bgGrid}></div>

            {/* --- NAV --- */}
            <nav className="nav">
                <Link to="/" className="logo">
                    KAKI GAMERZ<span className="dot"></span>
                </Link>

                <div className="nav-actions">
                    <div className="nav-links desktop-menu">
                        <Link to="/">Home</Link>
                    </div>
                    <Link to="/cart" className="cart-icon-container">
                        <span className="fa-stack fa-lg" data-count={cartCount}>
                            <i className="fa fa-circle fa-stack-2x"></i>
                            <i className="fa fa-shopping-cart fa-stack-1x fa-inverse"></i>
                        </span>
                    </Link>
                    <div className="sidebar" onClick={() => setIsOpen(!isOpen)}>
                        <i className={`fa ${isOpen ? "fa-times" : "fa-bars"}`}></i>
                    </div>
                </div>
            </nav>

            <div className={`mobile-nav-overlay ${isOpen ? 'active' : ''}`}>
                <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
                <Link to="/cart" onClick={() => setIsOpen(false)}>Cart</Link>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className={styles.container}>

                {/* Floating Image */}
                <div className={styles.imageSection}>
                    <img src={currentProduct.img} alt="Product" className={styles.img} />
                </div>

                <div className={styles.detailsSection}>
                    <span className={`${styles.brandTag} ${styles.stagger1}`}>KAKI GAMERZ OFFICIAL</span>
                    <h1 className={`${styles.productTitle} ${styles.stagger2}`}>{currentProduct.name}</h1>
                    <div className={`${styles.priceTag} ${styles.stagger3}`}>RM {finalPrice}</div>

                    {/* New Tech Specs Grid */}
                    <div className={`${styles.specGrid} ${styles.stagger4}`}>
                        {currentProduct.specs.map((spec, index) => (
                            <div key={index} className={styles.specItem}>
                                <i className={`fa ${spec.icon}`}></i>
                                <span>{spec.label}</span>
                            </div>
                        ))}
                    </div>

                    <p className={`${styles.productDesc} ${styles.stagger5}`}>{currentProduct.desc}</p>
                    <div className={`${styles.divider} ${styles.stagger5}`}></div>

                    {/* 2. VISUAL SWATCHES (No more dropdowns) */}
                    <div className={`${styles.formGroup} ${styles.stagger6}`}>
                        <label className={styles.label}>FINISH: <span className={styles.selectedVal}>{color}</span></label>
                        <div className={styles.colorGrid}>
                            {currentProduct.colors.map((c) => (
                                <button
                                    key={c.name}
                                    className={`${styles.colorSwatch} ${color === c.name ? styles.activeSwatch : ''}`}
                                    style={{ backgroundColor: c.hex }}
                                    onClick={() => setColor(c.name)}
                                    title={c.name}
                                ></button>
                            ))}
                        </div>
                    </div>

                    {/* 3. STORAGE PILLS */}
                    <div className={`${styles.formGroup} ${styles.stagger6}`}>
                        <label className={styles.label}>STORAGE: <span className={styles.selectedVal}>{size}GB</span></label>
                        <div className={styles.storageGrid}>
                            {['128', '256', '512'].map((s) => (
                                <button
                                    key={s}
                                    className={`${styles.storageOption} ${size === s ? styles.activeStorage : ''}`}
                                    onClick={() => setSize(s)}
                                >
                                    {s} GB
                                </button>
                            ))}
                        </div>
                    </div>

                    <button className={`${styles.addBtn} ${styles.stagger7}`} onClick={addToCart}>
                        Add to Bag
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;