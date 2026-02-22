const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();

const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dress-website';

app.use(express.json());
app.use(cors());

// Serve static images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

let isDbConnected = false;
mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
    .then(() => { isDbConnected = true; console.log('✅ MongoDB Connected'); })
    .catch(err => console.log('⚠️ Running in "DEMO MODE" (No Database).'));

// --- HIGH-QUALITY INDIAN FASHION CONFIG ---

const categories = ['summer', 'party', 'traditional', 'formal', 'casual', 'wedding'];

// Using full verified Unsplash URLs for reliable loading
const photoPool = {
    'traditional': [
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1610030469983-98ef80b66a92?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800'
    ],
    'party': [
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800'
    ],
    'casual': [
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800'
    ],
    'summer': [
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800'
    ],
    'formal': [
        'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1512436991641-6745cdb1723d?auto=format&fit=crop&q=80&w=800'
    ],
    'wedding': [
        'https://images.unsplash.com/photo-1519657337289-077653f724ed?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800'
    ]
};

const getVerifiedImage = (cat, index) => {
    const cleanCat = cat.toLowerCase();
    const pool = photoPool[cleanCat] || photoPool['casual'];
    return pool[index % pool.length];
};

// Demo mode in-memory cart storage
const demoCarts = {};

app.use((req, res, next) => {
    if (!isDbConnected && req.path.startsWith('/api')) {
        // Demo mode: Products list
        if (req.path === '/api/products' && req.method === 'GET') {
            const catQuery = req.query.category;
            let result = [];
            const countPerCat = 20;

            categories.forEach((cat, catIdx) => {
                const isMatch = !catQuery || catQuery === 'all' || cat === catQuery.toLowerCase();

                if (isMatch) {
                    for (let i = 1; i <= countPerCat; i++) {
                        const catLabel = cat.charAt(0).toUpperCase() + cat.slice(1);

                        result.push({
                            _id: `demo-${cat.slice(0, 3)}-${i}`,
                            name: `${catLabel} Premium Dress #${i}`,
                            price: Math.floor(Math.random() * (4500 - 800) + 800),
                            images: [getVerifiedImage(cat, i)],
                            category: cat,
                            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
                            countInStock: Math.floor(Math.random() * 50) + 5,
                            description: `Beautiful ${catLabel} dress from our curated selection. High quality fabric and elegant design.`,
                            rating: (Math.random() * 2 + 3).toFixed(1),
                            numReviews: Math.floor(Math.random() * 100) + 5
                        });
                    }
                }
            });
            console.log(`[DEMO MODE] Category: ${catQuery || 'all'} | Returning: ${result.length} products`);
            return res.json(result);
        }

        // Demo mode: Single product
        if (req.path.match(/^\/api\/products\/demo-/) && req.method === 'GET') {
            const id = req.path.split('/').pop();
            const parts = id.split('-');
            const catShort = parts[1];
            const num = parseInt(parts[2]);
            
            const catMap = { 'sum': 'summer', 'par': 'party', 'tra': 'traditional', 'for': 'formal', 'cas': 'casual', 'wed': 'wedding' };
            const cat = catMap[catShort] || 'casual';
            const catLabel = cat.charAt(0).toUpperCase() + cat.slice(1);

            return res.json({
                _id: id,
                name: `${catLabel} Premium Dress #${num}`,
                price: Math.floor(Math.random() * (4500 - 800) + 800),
                images: [getVerifiedImage(cat, num)],
                category: cat,
                sizes: ['S', 'M', 'L', 'XL', 'XXL'],
                countInStock: Math.floor(Math.random() * 50) + 5,
                description: `Beautiful ${catLabel} dress from our curated selection. High quality fabric and elegant design. Perfect for any occasion.`,
                rating: (Math.random() * 2 + 3).toFixed(1),
                numReviews: Math.floor(Math.random() * 100) + 5
            });
        }

        // Demo mode: Get cart
        if (req.path === '/api/cart' && req.method === 'GET') {
            const userId = 'demo-user';
            return res.json({ user: userId, items: demoCarts[userId] || [] });
        }

        // Demo mode: Add to cart
        if (req.path === '/api/cart' && req.method === 'POST') {
            const userId = 'demo-user';
            const { productId, name, image, price, quantity, size } = req.body;
            
            if (!demoCarts[userId]) {
                demoCarts[userId] = [];
            }

            const existingIndex = demoCarts[userId].findIndex(
                item => item.product === productId && item.size === size
            );

            if (existingIndex > -1) {
                demoCarts[userId][existingIndex].quantity += quantity;
            } else {
                demoCarts[userId].push({
                    _id: `cart-${Date.now()}`,
                    product: productId,
                    name,
                    image,
                    price,
                    quantity,
                    size
                });
            }

            console.log(`[DEMO MODE] Added to cart: ${name} (Size: ${size}, Qty: ${quantity})`);
            return res.json({ user: userId, items: demoCarts[userId] });
        }

        // Demo mode: Remove from cart
        if (req.path.match(/^\/api\/cart\//) && req.method === 'DELETE') {
            const userId = 'demo-user';
            const itemId = req.path.split('/').pop();
            
            if (demoCarts[userId]) {
                demoCarts[userId] = demoCarts[userId].filter(item => item._id !== itemId);
            }

            console.log(`[DEMO MODE] Removed from cart: ${itemId}`);
            return res.json({ user: userId, items: demoCarts[userId] || [] });
        }

        // Demo mode: Clear cart
        if (req.path === '/api/cart' && req.method === 'DELETE') {
            const userId = 'demo-user';
            demoCarts[userId] = [];
            return res.json({ message: 'Cart cleared' });
        }

        // Demo mode: User login
        if (req.path === '/api/users/login' && req.method === 'POST') {
            const { email, password } = req.body;
            // Demo admin account
            if (email === 'admin@demo.com' && password === 'admin123') {
                return res.json({
                    _id: 'demo-admin-001',
                    name: 'Admin User',
                    email: 'admin@demo.com',
                    role: 'admin',
                    token: 'demo-admin-token-12345'
                });
            }
            // Demo regular user
            if (email && password) {
                return res.json({
                    _id: 'demo-user-001',
                    name: email.split('@')[0],
                    email: email,
                    role: 'user',
                    token: 'demo-user-token-12345'
                });
            }
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Demo mode: User registration
        if (req.path === '/api/users' && req.method === 'POST') {
            const { name, email } = req.body;
            return res.status(201).json({
                _id: 'demo-user-' + Date.now(),
                name: name,
                email: email,
                role: 'user',
                token: 'demo-user-token-' + Date.now()
            });
        }

        // Demo mode: Delete product (admin)
        if (req.path.match(/^\/api\/products\/demo-/) && req.method === 'DELETE') {
            const id = req.path.split('/').pop();
            console.log(`[DEMO MODE] Product deleted: ${id}`);
            return res.json({ message: 'Product removed' });
        }

        // Demo mode: Update product (admin)
        if (req.path.match(/^\/api\/products\/demo-/) && req.method === 'PUT') {
            const id = req.path.split('/').pop();
            const updatedProduct = { _id: id, ...req.body };
            console.log(`[DEMO MODE] Product updated: ${id}`);
            return res.json(updatedProduct);
        }

        // Demo mode: Create product (admin)
        if (req.path === '/api/products' && req.method === 'POST') {
            const newProduct = {
                _id: 'demo-new-' + Date.now(),
                ...req.body,
                rating: 0,
                numReviews: 0
            };
            console.log(`[DEMO MODE] Product created: ${newProduct.name}`);
            return res.status(201).json(newProduct);
        }

        // Demo mode: Get my orders
        if (req.path === '/api/orders/myorders' && req.method === 'GET') {
            return res.json([]);
        }
    }
    next();
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => { console.log(`🚀 Indian Fashion Server active on port ${PORT}`); });
