// --- 1. INITIAL SETUP ---
// Dummy data to populate the page if it's the first time loading
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
        stock: 5,
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

// Load products from LocalStorage. If empty, use defaultProducts.
let products = JSON.parse(localStorage.getItem('kakiProducts')) || defaultProducts;

// Variables to track state
let currentCategory = 'all';
let isEditing = false;
let editId = null;

// Run this when page loads
document.addEventListener('DOMContentLoaded', () => {
    renderGrid();

    // Close modal if user clicks outside of it
    window.onclick = function(event) {
        if (event.target == document.getElementById('productModal')) {
            closeModal();
        }
    }

    // Listen for the Form Submit (Save button)
    document.getElementById('productForm').addEventListener('submit', handleFormSubmit);
});

// --- 2. RENDER & FILTER FUNCTIONS ---

// Draws the grid of products based on current filter
function renderGrid() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = ''; // Clear existing cards

    // Filter the products array
    const filtered = currentCategory === 'all'
        ? products
        : products.filter(p => p.category === currentCategory);

    // If no products found in category
    if (filtered.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666; padding: 20px;">No products found in this category.</p>';
        return;
    }

    // Loop through filtered products and create HTML
    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';

        // Use placeholder if image is missing
        const imgSrc = item.image ? item.image : 'https://via.placeholder.com/300?text=No+Image';

        card.innerHTML = `
            <img src="${imgSrc}" class="card-img" alt="${item.name}">
            <div class="card-body">
                <span class="card-tag">${item.category}</span>
                <h3 class="card-title">${item.name}</h3>
                <p class="card-desc">${item.desc}</p>
                <div class="stock-info">
                    <div>Price: <span>RM${parseFloat(item.price).toFixed(2)}</span></div>
                    <div>Stock: <span>${item.stock}</span></div>
                </div>
                <div class="card-actions">
                    <button class="btn-edit" onclick="openModal('edit', ${item.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteProduct(${item.id})">Delete</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Called when category buttons are clicked
function filterProducts(category, btnElement) {
    currentCategory = category;

    // Update the visual look of buttons (highlight active one)
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btnElement.classList.add('active');

    // Re-draw grid without reloading page
    renderGrid();
}

// --- 3. CRUD OPERATIONS (Add, Edit, Delete) ---

function deleteProduct(id) {
    if(confirm("Are you sure you want to delete this product?")) {
        // Remove product from array
        products = products.filter(p => p.id !== id);
        // Save to storage and refresh
        saveAndRender();
    }
}

function handleFormSubmit(e) {
    e.preventDefault(); // Stop form from refreshing the page

    // Get values from inputs
    const name = document.getElementById('pName').value;
    const imageInput = document.getElementById('pImage').value;
    const category = document.getElementById('pCategory').value;
    const stock = document.getElementById('pStock').value;
    const price = document.getElementById('pPrice').value;
    const desc = document.getElementById('pDesc').value;

    if (isEditing) {
        // --- EDIT MODE ---
        const index = products.findIndex(p => p.id === editId);
        if (index !== -1) {
            // Keep old image if new input is empty
            const finalImage = imageInput.trim() === "" ? products[index].image : imageInput;

            products[index] = {
                id: editId,
                name: name,
                image: finalImage,
                category: category,
                stock: stock,
                price: price,
                desc: desc
            };
        }
    } else {
        // --- ADD MODE ---
        const newId = Date.now(); // Generate a unique ID
        products.push({
            id: newId,
            name: name,
            image: imageInput,
            category: category,
            stock: stock,
            price: price,
            desc: desc
        });
    }

    saveAndRender();
    closeModal();
}

// Helper to save to LocalStorage and redraw grid
function saveAndRender() {
    localStorage.setItem('kakiProducts', JSON.stringify(products));
    renderGrid();
}

// --- 4. MODAL VISIBILITY ---

function openModal(mode, id = null) {
    const modal = document.getElementById('productModal');
    modal.style.display = 'flex';

    if (mode === 'edit') {
        isEditing = true;
        editId = id;
        document.getElementById('modalTitle').innerText = 'Edit Product';

        // Find product and fill form
        const p = products.find(item => item.id === id);
        document.getElementById('pName').value = p.name;
        document.getElementById('pImage').value = ""; // Clear so they can see they can leave empty
        document.getElementById('pImage').placeholder = p.image; // Show current URL as hint
        document.getElementById('pCategory').value = p.category;
        document.getElementById('pStock').value = p.stock;
        document.getElementById('pPrice').value = p.price;
        document.getElementById('pDesc').value = p.desc;
    } else {
        isEditing = false;
        editId = null;
        document.getElementById('modalTitle').innerText = 'Add New Product';
        document.getElementById('productForm').reset();
        document.getElementById('pImage').placeholder = "https://example.com/image.jpg";
    }
}

function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}