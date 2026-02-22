import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Badge } from 'react-bootstrap';
import axios from 'axios';
import { ShoppingCart, ArrowLeft, Star, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [loading, setLoading] = useState(true);
    const [imgError, setImgError] = useState(false);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(data);
                if (data.sizes && data.sizes.length > 0) {
                    setSelectedSize(data.sizes[0]);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product, quantity, selectedSize);
        navigate('/cart');
    };

    // Helper to ensure absolute image paths
    const getImagePath = (path) => {
        if (!path) return 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=500';
        if (path.startsWith('http')) return path;
        return `http://localhost:5000${path.startsWith('/') ? '' : '/'}${path}`;
    };

    if (loading) return <div className="text-center py-5">Loading...</div>;
    if (!product) return <div className="text-center py-5">Product not found.</div>;

    return (
        <div className="py-5">
            <Container>
                <Button
                    variant="link"
                    onClick={() => navigate(-1)}
                    className="text-decoration-none text-dark p-0 mb-4 d-flex align-items-center gap-2"
                >
                    <ArrowLeft size={18} /> Back to Shop
                </Button>

                <Row className="gy-5">
                    <Col lg={6}>
                        <img
                            src={imgError ? 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=500' : getImagePath(product.images[0])}
                            alt={product.name}
                            className="img-fluid rounded-4 shadow-sm w-100"
                            style={{ maxHeight: '600px', objectFit: 'cover' }}
                            onError={() => {
                                console.error(`[IMAGE ERROR] Details Page: ${getImagePath(product.images[0])}`);
                                setImgError(true);
                            }}
                        />
                    </Col>
                    <Col lg={6}>
                        <div className="ps-lg-4">
                            <Badge bg="light" text="primary" className="mb-2 px-3 py-2 fs-7 fw-bold">
                                {product.category}
                            </Badge>
                            <h1 className="fw-bold mb-3">{product.name}</h1>

                            <div className="d-flex align-items-center gap-3 mb-4">
                                <span className="fs-2 fw-bold text-primary">₹{product.price}</span>
                                <div className="d-flex align-items-center text-warning">
                                    <Star size={18} fill="currentColor" />
                                    <span className="ms-1 fw-bold text-dark">{product.rating}</span>
                                    <span className="ms-1 text-secondary">({product.numReviews} reviews)</span>
                                </div>
                            </div>

                            <p className="text-secondary-emphasis mb-5 fs-5 lead">
                                {product.description}
                            </p>

                            <hr className="my-4" />

                            <div className="mb-4">
                                <label className="fw-bold mb-2">Select Size</label>
                                <div className="d-flex gap-2">
                                    {product.sizes.map(size => (
                                        <Button
                                            key={size}
                                            variant={selectedSize === size ? 'primary' : 'outline-muted'}
                                            className={`px-4 py-2 border ${selectedSize === size ? '' : 'text-dark border-secondary-subtle'}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="d-flex gap-3 mb-5">
                                <div style={{ width: '120px' }}>
                                    <label className="fw-bold mb-2">Quantity</label>
                                    <Form.Select
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        disabled={product.countInStock <= 0}
                                    >
                                        {[...Array(Math.min(product.countInStock, 10)).keys()].map(x => (
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        ))}
                                    </Form.Select>
                                </div>
                                <div className="flex-grow-1">
                                    <label className="mb-2 invisible">Add to Cart</label>
                                    <Button
                                        className="w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2"
                                        size="lg"
                                        disabled={product.countInStock <= 0}
                                        onClick={handleAddToCart}
                                    >
                                        <ShoppingCart size={20} /> Add to Cart
                                    </Button>
                                </div>
                            </div>

                            <div className="bg-light p-4 rounded-4 border border-secondary-subtle">
                                <Row className="g-4">
                                    <Col sm={4} className="text-center">
                                        <Truck size={24} className="text-primary mb-2" />
                                        <p className="small fw-bold mb-0">Free Shipping</p>
                                        <p className="small text-secondary mb-0">On orders over ₹999</p>
                                    </Col>
                                    <Col sm={4} className="text-center">
                                        <ShieldCheck size={24} className="text-primary mb-2" />
                                        <p className="small fw-bold mb-0">Secure Payment</p>
                                        <p className="small text-secondary mb-0">100% Secure Transaction</p>
                                    </Col>
                                    <Col sm={4} className="text-center">
                                        <RefreshCw size={24} className="text-primary mb-2" />
                                        <p className="small fw-bold mb-0">Easy Returns</p>
                                        <p className="small text-secondary mb-0">30 Day Return Policy</p>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProductDetailsPage;
