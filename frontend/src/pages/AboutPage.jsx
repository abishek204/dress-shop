import { Container, Row, Col, Card } from 'react-bootstrap';
import { Target, Users, Award, ShieldCheck } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <div className="bg-dark text-white py-5 mb-5 position-relative" style={{
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&q=80&w=1600")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '400px',
                display: 'flex',
                alignItems: 'center'
            }}>
                <Container className="text-center">
                    <h1 className="display-3 fw-bold mb-4">Our Story</h1>
                    <p className="lead fs-4 mx-auto" style={{ maxWidth: '800px' }}>
                        Empowering elegance through the finest Indian heritage and modern fashion.
                    </p>
                </Container>
            </div>

            <Container className="py-5">
                {/* Brand Mission */}
                <Row className="align-items-center mb-5 pb-5">
                    <Col lg={6} className="mb-4 mb-lg-0">
                        <img
                            src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800"
                            alt="Fashion Design"
                            className="img-fluid rounded-4 shadow-lg"
                        />
                    </Col>
                    <Col lg={6} className="ps-lg-5">
                        <h2 className="fw-bold mb-4">Blending Tradition with Modernity</h2>
                        <p className="text-secondary fs-5 mb-4">
                            Founded in 2024, <strong>DressMe</strong> started with a simple vision: to bring the rich, intricate beauty of Indian ethnic wear to the global stage while embracing the sleek silhouettes of Western fashion.
                        </p>
                        <p className="text-secondary fs-5 mb-4">
                            We believe that every dress tells a story. From the hand-woven Banarasi silks to the precisely tailored formal blazers, our collection is curated for the modern individual who values both heritage and style.
                        </p>
                    </Col>
                </Row>

                {/* Values Section */}
                <div className="py-5 bg-white rounded-5 shadow-sm px-4 px-md-5 mb-5">
                    <h2 className="text-center fw-bold mb-5">What Makes Us Special</h2>
                    <Row className="g-4">
                        {[
                            {
                                icon: <Target className="text-primary mb-3" size={40} />,
                                title: "Our Mission",
                                text: "To provide high-quality, authentic fashion that makes you feel confident and beautiful on every occasion."
                            },
                            {
                                icon: <Award className="text-primary mb-3" size={40} />,
                                title: "Premium Quality",
                                text: "We source only the finest fabrics from across India, ensuring every stitch meets our elite standards."
                            },
                            {
                                icon: <Users className="text-primary mb-3" size={40} />,
                                title: "Community First",
                                text: "Supporting local artisans and handloom weavers is at the heart of our sourcing strategy."
                            },
                            {
                                icon: <ShieldCheck className="text-primary mb-3" size={40} />,
                                title: "Trusted Brand",
                                text: "Over 10,000 satisfied customers trust us for their most special moments, from weddings to corporate meets."
                            }
                        ].map((item, index) => (
                            <Col md={3} key={index} className="text-center">
                                <div className="p-3">
                                    {item.icon}
                                    <h4 className="fw-bold mb-3">{item.title}</h4>
                                    <p className="text-secondary small">{item.text}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>

                {/* Journey Section */}
                <Row className="gy-4 py-5">
                    <Col lg={4}>
                        <Card className="border-0 bg-primary text-white p-4 h-100 rounded-4 shadow">
                            <h3 className="fw-bold mb-4 mt-2">1,000+ Unique Designs</h3>
                            <p className="opacity-75 mb-0">Our designers work round the clock to create pieces that are unique, vibrant, and timeless.</p>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card className="border-0 bg-dark text-white p-4 h-100 rounded-4 shadow">
                            <h3 className="fw-bold mb-4 mt-2">Ethical Sourcing</h3>
                            <p className="opacity-75 mb-0">We ensure fair wages and ethical treatment for every artisan involved in our supply chain.</p>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card className="border-0 bg-secondary text-white p-4 h-100 rounded-4 shadow">
                            <h3 className="fw-bold mb-4 mt-2">Pan-India Delivery</h3>
                            <p className="opacity-75 mb-0">No matter where you are, the elegance of DressMe is just a click away from your doorstep.</p>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* CTA Section */}
            <div className="py-5 bg-light mt-5">
                <Container className="text-center">
                    <h2 className="fw-bold mb-4">Discover Your Own Style</h2>
                    <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: '600px' }}>
                        Browse our latest collection and find the perfect outfit that celebrates who you are.
                    </p>
                    <a href="/products" className="btn btn-primary btn-lg px-5 rounded-pill fw-bold shadow-sm">
                        Start Shopping
                    </a>
                </Container>
            </div>
        </div>
    );
};

export default AboutPage;
