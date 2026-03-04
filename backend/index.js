const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Serve static images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Database Connection ---
const sequelize = require('./config/db');
sequelize.sync().then(() => {
    console.log('✅ SQLite Database Connected');
}).catch(err => console.log('❌ Database Connection Error:', err.message));



app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => { console.log(`🚀 Indian Fashion Server active on port ${PORT}`); });
module.exports = app;
