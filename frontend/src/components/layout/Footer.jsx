import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer mt-auto py-5 bg-dark">
            <Container>
                <Row className="gy-4">
                    <Col lg={4} md={6}>
                        <h5 className="fw-bold mb-4 text-primary">DRESSME</h5>
                        <p className="text-white-50">
                            Empowering elegance through the finest Indian heritage and modern fashion. Our mission is to make you look and feel beautiful.
                        </p>
                        <div className="d-flex gap-3 mt-4">
                            <a href="#" className="text-white opacity-75 hover-opacity-100 transition-all"><Facebook size={20} /></a>
                            <a href="#" className="text-white opacity-75 hover-opacity-100 transition-all"><Instagram size={20} /></a>
                            <a href="#" className="text-white opacity-75 hover-opacity-100 transition-all"><Twitter size={20} /></a>
                        </div>
                    </Col>
                    <Col lg={2} md={6}>
                        <h6 className="fw-bold mb-4 text-white">Quick Links</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2"><Link to="/" className="text-white-50 text-decoration-none hover-white">Home</Link></li>
                            <li className="mb-2"><Link to="/products" className="text-white-50 text-decoration-none hover-white">Shop All</Link></li>
                            <li className="mb-2"><Link to="/categories" className="text-white-50 text-decoration-none hover-white">Categories</Link></li>
                            <li className="mb-2"><Link to="/about" className="text-white-50 text-decoration-none hover-white">About Us</Link></li>
                        </ul>
                    </Col>
                    <Col lg={2} md={6}>
                        <h6 className="fw-bold mb-4 text-white">Categories</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2"><Link to="/category/traditional" className="text-white-50 text-decoration-none hover-white">Traditional</Link></li>
                            <li className="mb-2"><Link to="/category/casual" className="text-white-50 text-decoration-none hover-white">Casual</Link></li>
                            <li className="mb-2"><Link to="/category/partywear" className="text-white-50 text-decoration-none hover-white">Party Wear</Link></li>
                            <li className="mb-2"><Link to="/category/summerdress" className="text-white-50 text-decoration-none hover-white">Summer Dress</Link></li>
                        </ul>
                    </Col>
                    <Col lg={4} md={6}>
                        <h6 className="fw-bold mb-4 text-white">Contact Us</h6>
                        <ul className="list-unstyled text-white-50">
                            <li className="mb-3 d-flex align-items-center gap-2">
                                <MapPin size={18} className="text-primary" /> 123 Fashion Street, Mumbai, MH 400001
                            </li>
                            <li className="mb-3 d-flex align-items-center gap-2">
                                <Phone size={18} className="text-primary" /> +91 (022) 123-4567
                            </li>
                            <li className="mb-3 d-flex align-items-center gap-2">
                                <Mail size={18} className="text-primary" /> support@dressme.in
                            </li>
                        </ul>
                    </Col>
                </Row>
                <hr className="my-4 border-secondary opacity-25" />
                <p className="text-center text-white-50 mb-0 small">
                    &copy; {new Date().getFullYear()} DRESSME. All rights reserved. Crafted with ❤️ for Indian Fashion.
                </p>
            </Container>
        </footer>
    );
};

export default Footer;
