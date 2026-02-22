const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dress-website');

const products = [
    {
        name: 'Floral Summer Dress',
        images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800'],
        description: 'A beautiful floral dress perfect for summer outings. Lightweight and breathable fabric.',
        category: 'summer',
        price: 49.99,
        countInStock: 15,
        sizes: ['S', 'M', 'L'],
        colors: ['Pink', 'Blue'],
    },
    {
        name: 'Elegant Evening Gown',
        images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800'],
        description: 'Stunning evening gown for formal events. High-quality satin finish.',
        category: 'formal',
        price: 129.99,
        countInStock: 10,
        sizes: ['M', 'L', 'XL'],
        colors: ['Navy', 'Black'],
    },
    {
        name: 'Sparkly Party Dress',
        images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800'],
        description: 'Get ready to shine in this sparkly cocktail dress. Perfect for parties.',
        category: 'party',
        price: 79.99,
        countInStock: 20,
        sizes: ['XS', 'S', 'M'],
        colors: ['Gold', 'Silver'],
    },
    {
        name: 'Boho Casual Dress',
        images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800'],
        description: 'Relaxed bohemian style dress for everyday comfort.',
        category: 'casual',
        price: 34.99,
        countInStock: 25,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Beige', 'White'],
    },
    {
        name: 'Lace Wedding Dress',
        images: ['https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&q=80&w=800'],
        description: 'Exquisite lace wedding dress with a long train. Elegant and timeless.',
        category: 'wedding',
        price: 999.99,
        countInStock: 5,
        sizes: ['S', 'M'],
        colors: ['Ivory', 'White'],
    },
];

const importData = async () => {
    try {
        await Product.deleteMany();
        await Product.insertMany(products);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
