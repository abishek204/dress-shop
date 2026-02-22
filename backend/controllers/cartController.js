const Cart = require('../models/Cart');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (cart) {
            res.json(cart);
        } else {
            res.json({ user: req.user._id, items: [] });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add item to cart or update quantity
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res) => {
    const { productId, name, image, price, quantity, size } = req.body;

    try {
        let cart = await Cart.findOne({ user: req.user._id });

        if (cart) {
            // Check if item already exists in cart
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId && item.size === size);

            if (itemIndex > -1) {
                // Item exists, update quantity
                cart.items[itemIndex].quantity += quantity;
            } else {
                // Item does not exist, push new item
                cart.items.push({ product: productId, name, image, price, quantity, size });
            }
            cart.updatedAt = Date.now();
            await cart.save();
            res.status(200).json(cart);
        } else {
            // Create new cart for user
            const newCart = await Cart.create({
                user: req.user._id,
                items: [{ product: productId, name, image, price, quantity, size }]
            });
            res.status(201).json(newCart);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
const removeFromCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id });

        if (cart) {
            cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id });

        if (cart) {
            cart.items = [];
            await cart.save();
            res.json({ message: 'Cart cleared' });
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCart,
    addToCart,
    removeFromCart,
    clearCart
};
