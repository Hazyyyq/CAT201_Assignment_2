import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // <--- FIXED: Added missing import
import styles from '../style/AdminPage.module.css';

const AdminPage = () => {
    // --- 1. INITIAL SETUP & STATE ---
    const defaultProducts = [
        {
            id: 1,
            name: "KakiPhone 15 Pro",
            category: "Phone",
            price: 4999,
            stock: 12,
            desc: "Titanium. So Strong. So light. So pro.",
            image: "https://images.unsplash.com/photo-1732020883989-b22d66f8f1b9?w=600&auto=format&fit=crop"
        },
        {
            id: 2,
            name: "KakiWatch Ultra",
            category: "Watch",
            price: 3299,
            stock: 3,
            desc: "Adventure awaits. The ultimate sports watch.",
            image: "https://images.unsplash.com/photo-1594619272803-932ee1b5a0d9?w=600&auto=format&fit=crop"
        },
        {
            id: 3,
            name: "KakiPad Air",
            category: "Tablet",
            price: 2500,
            stock: 20,
            desc: "Two sizes. Faster chip. Does it all.",
            image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2015&auto=format&fit=crop"
        },
        {
            id: 4,
            name: "Elden Ring",
            category: "Games",
            price: 199,
            stock: 50,
            desc: "Game of the Year edition. PS5/PC.",
            image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop"
        }
    ];

    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('kakiProducts');
        return saved ? JSON.parse(saved) : defaultProducts;
    });

    const [currentCategory, setCurrentCategory] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    // Form States
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Phone',
        stock: '',
        price: '',
        desc: '',
        image: ''
    });
    const [fileName, setFileName] = useState("No file chosen");
    const [previewImage, setPreviewImage] = useState("");

    // --- 2. EFFECTS ---
    useEffect(() => {
        localStorage.setItem('kakiProducts', JSON.stringify(products));
    }, [products]);

    // --- 3. HANDLERS ---
    const filteredProducts = currentCategory === 'all'
        ? products
        : products.filter(p => p.category === currentCategory);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const openModal = (mode, product = null) => {
        setIsModalOpen(true);
        if (mode === 'edit' && product) {
            setIsEditing(true);
            setEditId(product.id);
            setFormData({
                name: product.name,
                category: product.category,
                stock: product.stock,
                price: product.price,
                desc: product.desc,
                image: product.image
            });
            setPreviewImage(product.image || "");
            setFileName("Image kept (upload new to change)");
        } else {
            setIsEditing(false);
            setEditId(null);
            setFormData({ name: '', category: 'Phone', stock: '', price: '', desc: '', image: '' });
            setPreviewImage("");
            setFileName("No file chosen");
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = (evt) => {
                setPreviewImage(evt.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        const keyMap = {
            pName: 'name',
            pCategory: 'category',
            pStock: 'stock',
            pPrice: 'price',
            pDesc: 'desc'
        };
        setFormData(prev => ({ ...prev, [keyMap[id]]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalImage = previewImage !== "" ? previewImage : formData.image;

        const productData = {
            id: isEditing ? editId : Date.now(),
            name: formData.name,
            image: finalImage,
            category: formData.category,
            stock: formData.stock,
            price: formData.price,
            desc: formData.desc
        };

        if (isEditing) {
            setProducts(products.map(p => p.id === editId ? productData : p));
        } else {
            setProducts([...products, productData]);
        }
        closeModal();
    };

    return (
        <div className="dark-theme">
            {/* Global Nav */}
            <nav className="nav">
                {/* 1. LEFT: LOGO */}
                {/* Ensure you have React Router installed, or switch this back to <a href="/"> */}
                <Link to="/" className="logo">
                    KAKI GAMERZ-ADMIN<span className="dot"></span>
                </Link>

                {/* 2. CENTER: NAV LINKS */}
                <div className="nav-links desktop-menu">
                    <Link to ="/">Store Front</Link>
                    <a href="#" className="active">Inventory</a>
                    <a href="#">Orders</a>
                </div>

                {/* 3. RIGHT: GROUPED ACTIONS */}
                <div className="nav-actions">
                    <div className={styles['admin-badge']}>Admin Mode</div>
                </div>

                {/* SIDEBAR TRIGGER */}
                <div className="sidebar" onClick={() => setIsOpen(!isOpen)}>
                    <i className={`fa ${isOpen ? "fa-times" : "fa-bars"}`}></i>
                </div>
            </nav>

            <div className={styles['admin-container']}>
                <div className={styles['header-section']}>
                    <div className={styles['header-text']}>
                        <h1>Product Inventory</h1>
                        <p>Manage stock levels, prices, and product categories.</p>
                    </div>
                    <button className={styles['btn-add']} onClick={() => openModal('add')}>
                        <i className="fa fa-plus"></i> Add New Product
                    </button>
                </div>

                <div className={styles['filter-tabs']}>
                    {['all', 'Phone', 'Watch', 'Tablet', 'Games'].map(cat => (
                        <button
                            key={cat}
                            className={`${styles['tab']} ${currentCategory === cat ? styles['active'] : ''}`}
                            onClick={() => setCurrentCategory(cat)}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>

                <div className={styles['product-grid']} id="productGrid">
                    {filteredProducts.length === 0 ? (
                        <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#666', padding: '20px' }}>
                            No products found in this category.
                        </p>
                    ) : (
                        filteredProducts.map((item) => {
                            const stockClass = item.stock < 5 ? styles['text-danger'] : '';
                            return (
                                <div className={styles['product-card']} key={item.id}>
                                    <img
                                        src={item.image || 'https://via.placeholder.com/300?text=No+Image'}
                                        className={styles['card-img']}
                                        alt={item.name}
                                    />
                                    <div className={styles['card-body']}>
                                        <span className={styles['card-tag']}>{item.category}</span>
                                        <h3 className={styles['card-title']}>{item.name}</h3>
                                        <p className={styles['card-desc']}>{item.desc}</p>
                                        <div className={styles['stock-info']}>
                                            <div>Price: <span>RM{parseFloat(item.price).toFixed(2)}</span></div>
                                            <div>Stock: <span className={stockClass}>{item.stock}</span></div>
                                        </div>
                                        <div className={styles['card-actions']}>
                                            <button className={styles['btn-edit']} onClick={() => openModal('edit', item)}>Edit</button>
                                            <button className={styles['btn-delete']} onClick={() => handleDelete(item.id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {isModalOpen && (
                <div id="productModal" className={styles['modal']} style={{display: 'flex'}} onClick={(e) => {if(e.target.id === 'productModal') closeModal()}}>
                    <div className={styles['modal-content']}>
                        <div className={styles['modal-header']}>
                            <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
                            <span className={styles['close-btn']} onClick={closeModal}>&times;</span>
                        </div>

                        <form id="productForm" onSubmit={handleSubmit}>
                            <div className={styles['form-group']}>
                                <label>Product Name</label>
                                <input
                                    type="text"
                                    id="pName"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Product Name"
                                />
                            </div>

                            <div className={styles['form-group']}>
                                <label>Product Image</label>
                                <label htmlFor="pFile" className={styles['custom-file-upload']}>
                                    <i className="fa fa-cloud-upload"></i> Choose Image
                                </label>
                                <span className={styles['file-name-display']}>{fileName}</span>
                                <input
                                    type="file"
                                    id="pFile"
                                    accept=".jpg, .jpeg, .png, .webp"
                                    onChange={handleFileChange}
                                    style={{display: 'none'}}
                                />
                                {previewImage && (
                                    <img
                                        src={previewImage}
                                        id="imagePreview"
                                        alt="Preview"
                                        style={{
                                            display: 'block',
                                            maxWidth: '100px',
                                            height: '100px',
                                            objectFit: 'cover',
                                            marginTop: '10px',
                                            borderRadius: '8px',
                                            border: '1px solid #424245'
                                        }}
                                    />
                                )}
                            </div>

                            <div className={styles['form-row']}>
                                <div className={styles['form-group']}>
                                    <label>Category</label>
                                    <select id="pCategory" value={formData.category} onChange={handleInputChange}>
                                        <option value="Phone">Phone</option>
                                        <option value="Watch">Watch</option>
                                        <option value="Tablet">Tablet</option>
                                        <option value="Games">Games</option>
                                    </select>
                                </div>
                                <div className={styles['form-group']}>
                                    <label>Stock Left</label>
                                    <input type="number" id="pStock" value={formData.stock} onChange={handleInputChange} required min="0" />
                                </div>
                            </div>

                            <div className={styles['form-group']}>
                                <label>Price (RM)</label>
                                <input type="number" id="pPrice" value={formData.price} onChange={handleInputChange} required step="0.01" />
                            </div>

                            <div className={styles['form-group']}>
                                <label>Description</label>
                                <textarea id="pDesc" rows="3" value={formData.desc} onChange={handleInputChange} required></textarea>
                            </div>

                            <div className={styles['modal-actions']}>
                                <button type="button" className={styles['btn-cancel']} onClick={closeModal}>Cancel</button>
                                <button type="submit" className={styles['btn-save']}>Save Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;