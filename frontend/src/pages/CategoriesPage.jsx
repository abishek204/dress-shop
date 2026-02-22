import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CategoriesPage = () => {
    const fallbackImage = 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=600';

    const categories = [
        {
            name: 'Casual',
            count: 'Simple & Trendy',
            image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800',
            description: 'Simple, comfortable, and trendy. Kurti+Jeans, Leggings, Cotton Tops, Long Frocks, and Palazzo Sets.',
            path: 'casual'
        },
        {
            name: 'Party Wear',
            count: 'Glamorous Collection',
            image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
            description: 'Shine in every celebration with our curated glamorous party wear collection.',
            path: 'party'
        },
        {
            name: 'Traditional',
            count: 'Festival & Wedding',
            image: 'https://images.unsplash.com/photo-1610030469983-98ef80b66a92?auto=format&fit=crop&q=80&w=800',
            description: 'Perfect for festivals, weddings, family functions. Sarees, Lehengas, and Half Sarees.',
            path: 'traditional'
        },
        {
            name: 'Formal',
            count: 'Professional Wear',
            image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800',
            description: 'Professional and sophisticated. Minimal Cotton Sarees, Kurti+Pants, and Solid Tops.',
            path: 'formal'
        },
        {
            name: 'Summer Dress',
            count: 'Light & Breezy',
            image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
            description: 'Stay cool and stylish with our lightweight breathable summer cotton dress collection.',
            path: 'summer'
        },
        {
            name: 'Wedding',
            count: 'Bridal Collection',
            image: 'https://images.unsplash.com/photo-1519657337289-077653f724ed?auto=format&fit=crop&q=80&w=800',
            description: 'Exquisite bridal wear and wedding guest collection for your special day.',
            path: 'wedding'
        }
    ];

    return (
        <div className="py-5 bg-light min-vh-100">
            <Container>
                <div className="text-center mb-5 mt-4">
                    <h1 className="fw-bold display-4 mb-3">Shop by Category</h1>
                    <p className="text-secondary lead mx-auto" style={{ maxWidth: '600px' }}>
                        Discover our diverse collections tailored for every style, mood, and occasion.
                    </p>
                </div>

                <Row className="g-4">
                    {categories.map((category, index) => (
                        <Col key={index} lg={4} md={6}>
                            <Card
                                as={Link}
                                to={`/category/${category.path}`}
                                className="category-card h-100 border-0 shadow-sm overflow-hidden rounded-4 text-decoration-none group transition-all"
                            >
                                <div className="position-relative overflow-hidden" style={{ height: '300px' }}>
                                    <Card.Img
                                        src={category.image}
                                        className="h-100 w-100 object-fit-cover transition-transform duration-500 hover-scale"
                                        alt={category.name}
                                        onError={(e) => {
                                            console.error(`[IMAGE ERROR] Category: ${category.name}`);
                                            e.target.src = fallbackImage;
                                        }}
                                    />
                                    <div className="position-absolute top-0 end-0 m-3">
                                        <span className="badge bg-white text-primary px-3 py-2 rounded-pill shadow-sm">
                                            {category.count}
                                        </span>
                                    </div>
                                    <div className="position-absolute bottom-0 start-0 w-100 p-4 bg-gradient-dark text-white">
                                        <h3 className="fw-bold mb-1">{category.name}</h3>
                                        <div className="d-flex align-items-center opacity-0 group-hover-opacity-100 transition-opacity">
                                            <span className="small me-2">Explore Collection</span>
                                            <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </div>
                                <Card.Body className="bg-white p-4">
                                    <p className="text-secondary mb-0 small">
                                        {category.description}
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <style>{`
                .category-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
                }
                .hover-scale {
                    transition: transform 0.8s ease;
                }
                .category-card:hover .hover-scale {
                    transform: scale(1.1);
                }
                .group:hover .group-hover-opacity-100 {
                    opacity: 1 !important;
                }
                .duration-500 {
                    transition-duration: 500ms;
                }
                .bg-gradient-dark {
                    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
                }
            `}</style>
        </div>
    );
};

export default CategoriesPage;
