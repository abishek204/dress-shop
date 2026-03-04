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
// List of allowed origins in production
const allowedOrigins = [
    'https://dress-shop-zrb9.vercel.app',
    'https://dress-shop-xi.vercel.app',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Accept-Version',
        'Content-Length',
        'Content-MD5',
        'Date',
        'X-Api-Version'
    ]
}));

// Explicitly handle all OPTIONS requests for preflight
// cors() middleware above already handles OPTIONS preflight requests if configured properly

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

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Indian Fashion Server active on port ${PORT}`);
    console.log(`📡 Listening on all network interfaces (0.0.0.0)`);
});
module.exports = app;
