import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../style/CartPage.module.css'; // Import the module

const CartPage = () => {
    // 1. State for Cart Items and Mobile Menu
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isOpen, setIsOpen] = useState(false); // For Global Mobile Menu

    // 2. Load Cart from LocalStorage on Mount (replaces window.onload)
    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = () => {
        const storedCart = JSON.parse(localStorage.getItem('kakiCart')) || [];
        setCartItems(storedCart);
        calculateTotal(storedCart);
    };

    // 3. Calculate Total Price logic
    const calculateTotal = (items) => {
        const total = items.reduce((acc, item) => acc + item.price, 0);
        setTotalPrice(total);
    };

    // 4. Remove Single Item Logic
    const removeItem = (index) => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1); // Remove item at specific index
        setCartItems(updatedCart);
        calculateTotal(updatedCart);
        localStorage.setItem('kakiCart', JSON.stringify(updatedCart));
    };

    // 5. Clear Entire Cart Logic
    const clearCart = () => {
        localStorage.removeItem('kakiCart');
        setCartItems([]);
        setTotalPrice(0);
    };

    // 6. Checkout Handler
    const handleCheckout = () => {
        alert("Proceeding to Payment Gateway...");
    };

    return (
        <div className={styles.pageWrapper}>

            {/* --- GLOBAL NAVIGATION (Using Global strings) --- */}
            <nav className="nav">
                {/* 1. Global Logo */}
                <Link to="/" className="logo">
                    KAKI GAMERZ<span className="dot"></span>
                </Link>

                {/* 2. Global Actions */}
                <div className="nav-actions">
                    <div className="nav-links desktop-menu">
                        <Link to="/">Continue Shopping</Link>
                    </div>

                    {/* Global Sidebar Trigger */}
                    <div className="sidebar" onClick={() => setIsOpen(!isOpen)}>
                        <i className={`fa ${isOpen ? "fa-times" : "fa-bars"}`}></i>
                    </div>
                </div>
            </nav>

            {/* Global Mobile Menu Overlay */}
            <div className={`mobile-nav-overlay ${isOpen ? 'active' : ''}`}>
                <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
                <Link to="/" onClick={() => setIsOpen(false)}>Continue Shopping</Link>
            </div>


            {/* --- MODULAR CART CONTENT (Using styles.X) --- */}
            <div className={styles['cart-container']}>
                <h1 className={styles['cart-title']}>Review your bag.</h1>

                <div id="cart-items">
                    {cartItems.length === 0 ? (
                        <p className={styles['empty-msg']}>Your bag is empty.</p>
                    ) : (
                        cartItems.map((item, index) => (
                            <div key={index} className={styles['cart-item']}>
                                <img src={item.img} alt={item.name} />
                                <div className={styles['item-info']}>
                                    <div className={styles['item-name']}>{item.name}</div>
                                    <div className={styles['item-details']}>
                                        Color: {item.color} | Spec: {item.size}
                                    </div>
                                    <button
                                        className={styles['remove-btn']}
                                        onClick={() => removeItem(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                                <div className={styles['item-price']}>RM {item.price}</div>
                            </div>
                        ))
                    )}
                </div>

                {/* Show Total Section only if cart has items */}
                {cartItems.length > 0 && (
                    <div className={styles['total-section']}>
                        <p>Total: <span id="cart-total">RM {totalPrice.toFixed(2)}</span></p>

                        <button className={styles['checkout-btn']} onClick={handleCheckout}>
                            Check Out
                        </button>

                        <br /><br />

                        <button className={styles['clear-btn']} onClick={clearCart}>
                            Clear Cart
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;