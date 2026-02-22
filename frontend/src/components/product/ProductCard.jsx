import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const [imgError, setImgError] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product, 1, product.sizes[0] || 'M');
    };

    // Fallback Indian fashion image if the primary one fails to load
    const fallbackImage = 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=500';

    // Helper to ensure absolute image paths
    const getImagePath = (path) => {
        if (!path) return fallbackImage;
        if (path.startsWith('http')) return path;
        return `http://localhost:5000${path.startsWith('/') ? '' : '/'}${path}`;
    };

    return (
        <Card className="h-100 product-card shadow-sm border-0 rounded-4 transition-all">
            <div className="position-relative overflow-hidden rounded-top-4">
                <Link to={`/product/${product._id}`}>
                    <Card.Img
                        variant="top"
                        src={imgError ? fallbackImage : getImagePath(product.images[0])}
                        style={{ height: '320px', objectFit: 'cover' }}
                        alt={product.name}
                        loading="lazy"
                        onError={(e) => {
                            console.error(`[IMAGE ERROR] Failed to load: ${getImagePath(product.images[0])}`);
                            setImgError(true);
                        }}
                    />
                </Link>
                <div className="position-absolute top-0 start-0 m-2">
                    <span className="badge bg-white text-primary shadow-sm px-3 py-2 rounded-pill fw-bold" style={{ fontSize: '0.7rem' }}>
                        {product.category}
                    </span>
                </div>
            </div>
            <Card.Body className="d-flex flex-column p-3">
                <Card.Title className="fs-6 fw-bold mb-2 text-truncate" title={product.name}>
                    <Link to={`/product/${product._id}`} className="text-dark text-decoration-none hover-primary">
                        {product.name}
                    </Link>
                </Card.Title>
                <div className="mb-3">
                    <h5 className="fw-bold text-primary mb-0">₹{product.price}</h5>
                    {product.countInStock <= 0 ? (
                        <div className="text-danger small fw-bold">Out of Stock</div>
                    ) : product.countInStock < 10 ? (
                        <div className="text-warning small fw-bold">Only {product.countInStock} left!</div>
                    ) : null}
                </div>
                <div className="mt-auto d-flex gap-2">
                    <Button
                        variant="primary"
                        className="flex-grow-1 d-flex align-items-center justify-content-center gap-2 rounded-pill fw-bold shadow-sm"
                        onClick={handleAddToCart}
                        disabled={product.countInStock <= 0}
                        size="sm"
                    >
                        <ShoppingCart size={16} /> Add
                    </Button>
                    <Button
                        as={Link}
                        to={`/product/${product._id}`}
                        variant="outline-secondary"
                        className="d-flex align-items-center justify-content-center rounded-circle p-2 shadow-sm"
                        style={{ width: '38px', height: '38px' }}
                    >
                        <Eye size={18} />
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
