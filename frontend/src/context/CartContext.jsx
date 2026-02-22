import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
                setCartItems(JSON.parse(storedCart));
            } else {
                setCartItems([]);
            }
        }
    }, [user]);

    const fetchCart = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };
            const { data } = await axios.get('http://localhost:5000/api/cart', config);
            setCartItems(data.items || []);
        } catch (error) {
            console.error('Error fetching cart:', error);
            // Fallback to localStorage if API fails
            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
                setCartItems(JSON.parse(storedCart));
            }
        }
    };

    const addToCart = async (product, quantity, size) => {
        const newItem = {
            product: product._id,
            name: product.name,
            image: product.images[0],
            price: product.price,
            quantity,
            size
        };

        if (user) {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` },
                };
                const { data } = await axios.post('http://localhost:5000/api/cart', {
                    productId: product._id,
                    name: product.name,
                    image: product.images[0],
                    price: product.price,
                    quantity,
                    size
                }, config);
                setCartItems(data.items || []);
            } catch (error) {
                console.error('Error adding to cart:', error);
                // Fallback to local state if API fails
                addToLocalCart(product, quantity, size);
            }
        } else {
            addToLocalCart(product, quantity, size);
        }
    };

    const addToLocalCart = (product, quantity, size) => {
        const updatedCart = [...cartItems];
        const existItem = updatedCart.find((x) => x.product === product._id && x.size === size);

        if (existItem) {
            existItem.quantity += quantity;
        } else {
            updatedCart.push({
                product: product._id,
                name: product.name,
                image: product.images[0],
                price: product.price,
                quantity,
                size
            });
        }
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeFromCart = async (itemId) => {
        if (user) {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` },
                };
                const { data } = await axios.delete(`http://localhost:5000/api/cart/${itemId}`, config);
                setCartItems(data.items || []);
            } catch (error) {
                console.error('Error removing from cart:', error);
                // Fallback to local removal
                const updatedCart = cartItems.filter((x) => x._id !== itemId && x.product !== itemId);
                setCartItems(updatedCart);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            }
        } else {
            const updatedCart = cartItems.filter((x) => x.product !== itemId);
            setCartItems(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        // For simplicity, local state update or API call
        const updatedCart = cartItems.map(item =>
            item._id === itemId || item.product === itemId ? { ...item, quantity } : item
        );
        setCartItems(updatedCart);
        if (!user) {
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
