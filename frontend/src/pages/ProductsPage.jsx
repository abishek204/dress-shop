import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { Search, ShoppingBag } from 'lucide-react';

const ProductsPage = () => {
    const { cat } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [visibleItems, setVisibleItems] = useState(20);

    const categories = ['all', 'casual', 'party', 'traditional', 'formal', 'summer', 'wedding'];

    useEffect(() => {
        if (cat) {
            // Map URL param to our internal category names
            const catMap = {
                'casual': 'casual',
                'party': 'party',
                'partywear': 'party',
                'traditional': 'traditional',
                'formal': 'formal',
                'summer': 'summer',
                'summerdress': 'summer',
                'wedding': 'wedding'
            };
            setSelectedCategory(catMap[cat.toLowerCase()] || 'all');
        } else {
            setSelectedCategory('all');
        }
    }, [cat]);

    useEffect(() => {
        const fetchProducts = async () => {
            console.log(`[DEBUG] Category Clicked: ${selectedCategory}`);
            setLoading(true);
            setProducts([]); // Clear old products IMMEDIATELY
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products?category=${selectedCategory}`);
                console.log(`[DEBUG] API Response Length: ${data.length} items`);
                setProducts(data); // Overwrite state
                setVisibleItems(20);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [selectedCategory]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        if (category === 'all') {
            navigate('/products');
        } else {
            navigate(`/category/${category}`);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="py-5 bg-light min-vh-100">
            <Container>
                <div className="text-center mb-5">
                    <h2 className="fw-bold mb-4">Our Dress Collection</h2>

                    {/* Category Buttons */}
                    <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
                        {categories.map((catName) => (
                            <Button
                                key={catName}
                                variant={selectedCategory === catName ? 'primary' : 'outline-primary'}
                                className={`px-4 py-2 rounded-pill fw-bold transition-all ${selectedCategory === catName ? 'shadow' : ''}`}
                                onClick={() => handleCategoryClick(catName)}
                            >
                                {catName.charAt(0).toUpperCase() + catName.slice(1)}
                            </Button>
                        ))}
                    </div>

                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <InputGroup className="shadow-sm rounded-pill overflow-hidden">
                                <InputGroup.Text className="bg-white border-end-0 ps-4">
                                    <Search size={20} className="text-secondary" />
                                </InputGroup.Text>
                                <Form.Control
                                    placeholder="Search for your perfect dress..."
                                    className="border-start-0 py-3 ps-2"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-5 bg-white rounded-4 shadow-sm">
                        <ShoppingBag size={60} className="text-secondary mb-3 opacity-25" />
                        <h4 className="fw-bold text-secondary">No products available in this category</h4>
                        <p className="text-muted">Try searching for something else or browse another collection.</p>
                        <Button variant="link" onClick={() => handleCategoryClick('all')}>
                            View All Collection
                        </Button>
                    </div>
                ) : (
                    <>
                        <Row className="g-4">
                            {filteredProducts.slice(0, visibleItems).map((product) => (
                                <Col key={product._id} lg={3} md={4} sm={6}>
                                    <ProductCard product={product} />
                                </Col>
                            ))}
                        </Row>

                        {visibleItems < filteredProducts.length && (
                            <div className="text-center mt-5">
                                <Button
                                    variant="outline-primary"
                                    className="px-5 py-2 rounded-pill fw-bold"
                                    onClick={() => setVisibleItems(prev => prev + 20)}
                                >
                                    Load More Dresses ({filteredProducts.length - visibleItems} remaining)
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </Container>
        </div>
    );
};

export default ProductsPage;
