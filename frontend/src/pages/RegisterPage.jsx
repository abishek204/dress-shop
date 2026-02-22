import { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Mail, Lock, User, UserPlus } from 'lucide-react';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { register, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const result = await register(name, email, password);
        if (!result.success) {
            setError(result.message);
        }
    };

    return (
        <div className="py-5 bg-light min-vh-100 d-flex align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md={10} lg={8}>
                        <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
                            <Row className="g-0">
                                <Col md={6} className="d-none d-md-block">
                                    <img
                                        src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=600"
                                        alt="Register"
                                        className="h-100 w-100"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </Col>
                                <Col md={6} className="p-4 p-lg-5">
                                    <div className="text-center mb-5">
                                        <h2 className="fw-bold text-primary">DRESSME</h2>
                                        <p className="text-secondary">Create an account to start shopping.</p>
                                    </div>

                                    {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="small fw-bold">Full Name</Form.Label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0"><User size={18} className="text-secondary" /></span>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="John Doe"
                                                    className="bg-light border-start-0 py-2"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label className="small fw-bold">Email Address</Form.Label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0"><Mail size={18} className="text-secondary" /></span>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="name@example.com"
                                                    className="bg-light border-start-0 py-2"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label className="small fw-bold">Password</Form.Label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0"><Lock size={18} className="text-secondary" /></span>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Min 6 characters"
                                                    className="bg-light border-start-0 py-2"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </Form.Group>

                                        <Form.Group className="mb-4">
                                            <Form.Label className="small fw-bold">Confirm Password</Form.Label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0"><Lock size={18} className="text-secondary" /></span>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Repeat password"
                                                    className="bg-light border-start-0 py-2"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </Form.Group>

                                        <Button variant="primary" type="submit" className="w-100 py-3 rounded-pill fw-bold mb-4 shadow-sm">
                                            <UserPlus size={18} className="me-2" /> Register
                                        </Button>
                                    </Form>

                                    <div className="text-center">
                                        <p className="small text-secondary mb-0">
                                            Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-none">Login Here</Link>
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RegisterPage;
