import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/product/ProductCard';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/products');
                setFeaturedProducts(data.slice(0, 4));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const categories = [
        { name: 'Casual', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=400' },
        { name: 'Formal', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=400' },
        { name: 'Party', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=400' },
        { name: 'Wedding', image: 'https://images.unsplash.com/photo-1519657337289-077653f724ed?auto=format&fit=crop&q=80&w=400' },
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="hero-section">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6} className="mb-5 mb-lg-0">
                            <h1 className="display-3 fw-bold mb-4">
                                Redefine Your <span className="text-primary">Elegance</span>
                            </h1>
                            <p className="lead mb-5 text-secondary">
                                Discover our curated collection of premium dresses for every occasion. From casual chic to wedding glam, we have it all.
                            </p>
                            <div className="d-flex gap-3">
                                <Button as={Link} to="/products" variant="primary" size="lg" className="px-5 py-3 rounded-pill fw-bold">
                                    Shop Now
                                </Button>
                                <Button as={Link} to="/categories" variant="outline-dark" size="lg" className="px-5 py-3 rounded-pill fw-bold">
                                    View Collections
                                </Button>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="position-relative">
                                <img
                                    src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800"
                                    alt="Fashion"
                                    className="img-fluid rounded-4 shadow-lg"
                                />
                                <div className="position-absolute bottom-0 start-0 m-4 p-4 bg-white rounded-4 shadow-lg d-none d-md-block" style={{ width: '200px' }}>
                                    <h6 className="fw-bold mb-0">2026 Collection</h6>
                                    <p className="small text-secondary mb-0">New Arrivals Just In</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Categories Section */}
            <section className="py-5">
                <Container className="py-5">
                    <div className="d-flex justify-content-between align-items-end mb-5">
                        <div>
                            <h2 className="fw-bold mb-2">Shop by Category</h2>
                            <p className="text-secondary mb-0">Find the perfect dress for your special moment</p>
                        </div>
                        <Link to="/categories" className="text-primary fw-bold text-decoration-none d-flex align-items-center gap-2">
                            All Categories <ArrowRight size={18} />
                        </Link>
                    </div>
                    <Row className="g-4">
                        {categories.map((cat) => (
                            <Col key={cat.name} md={3} sm={6}>
                                <Link to={`/category/${cat.name.toLowerCase()}`} className="text-decoration-none">
                                    <Card className="border-0 shadow-sm overflow-hidden h-100 product-card">
                                        <Card.Img src={cat.image} className="rounded-0" style={{ height: '250px', objectFit: 'cover' }} />
                                        <div className="position-absolute top-50 start-50 translate-middle text-center w-100 px-3">
                                            <h4 className="text-white fw-bold mb-0 text-shadow">{cat.name}</h4>
                                        </div>
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* Featured Products */}
            <section className="py-5 bg-light">
                <Container className="py-5">
                    <h2 className="fw-bold mb-5 text-center">Featured New Arrivals</h2>
                    <Row className="g-4">
                        {featuredProducts.map((product) => (
                            <Col key={product._id} lg={3} md={4} sm={6}>
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>
                    <div className="text-center mt-5">
                        <Button as={Link} to="/products" variant="outline-primary" size="lg" className="px-5 rounded-pill">
                            View All Products
                        </Button>
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default HomePage;
