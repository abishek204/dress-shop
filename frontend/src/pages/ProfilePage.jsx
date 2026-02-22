import { useContext, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { User, Mail, Calendar, Shield, Edit2, Save } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [message, setMessage] = useState('');

    const handleSave = () => {
        // In a real app, you would call an API to update the user profile
        setMessage('Profile updated successfully!');
        setIsEditing(false);
        setTimeout(() => setMessage(''), 3000);
    };

    if (!user) {
        return (
            <Container className="py-5 text-center">
                <h4>Please login to view your profile</h4>
            </Container>
        );
    }

    return (
        <div className="py-5 bg-light min-vh-100">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                            {/* Profile Header */}
                            <div className="bg-primary text-white p-5 text-center">
                                <div 
                                    className="bg-white text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                    style={{ width: '100px', height: '100px' }}
                                >
                                    <User size={50} />
                                </div>
                                <h2 className="fw-bold mb-1">{user.name}</h2>
                                <p className="mb-0 opacity-75">{user.email}</p>
                            </div>

                            {/* Profile Body */}
                            <Card.Body className="p-4 p-lg-5">
                                {message && (
                                    <Alert variant="success" className="mb-4">
                                        {message}
                                    </Alert>
                                )}

                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h4 className="fw-bold mb-0">Profile Information</h4>
                                    <Button
                                        variant={isEditing ? "outline-secondary" : "outline-primary"}
                                        size="sm"
                                        className="rounded-pill px-3"
                                        onClick={() => setIsEditing(!isEditing)}
                                    >
                                        {isEditing ? (
                                            <>Cancel</>
                                        ) : (
                                            <><Edit2 size={14} className="me-1" /> Edit</>
                                        )}
                                    </Button>
                                </div>

                                <Form>
                                    <Row className="g-4">
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="small fw-bold text-secondary">
                                                    <User size={14} className="me-1" /> Full Name
                                                </Form.Label>
                                                {isEditing ? (
                                                    <Form.Control
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="py-2"
                                                    />
                                                ) : (
                                                    <p className="mb-0 fs-5">{user.name}</p>
                                                )}
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="small fw-bold text-secondary">
                                                    <Mail size={14} className="me-1" /> Email Address
                                                </Form.Label>
                                                {isEditing ? (
                                                    <Form.Control
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="py-2"
                                                    />
                                                ) : (
                                                    <p className="mb-0 fs-5">{user.email}</p>
                                                )}
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="small fw-bold text-secondary">
                                                    <Shield size={14} className="me-1" /> Account Type
                                                </Form.Label>
                                                <p className="mb-0 fs-5">
                                                    <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'} rounded-pill px-3 py-2`}>
                                                        {user.role === 'admin' ? 'Administrator' : 'Customer'}
                                                    </span>
                                                </p>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="small fw-bold text-secondary">
                                                    <Calendar size={14} className="me-1" /> Member Since
                                                </Form.Label>
                                                <p className="mb-0 fs-5">
                                                    {new Date().toLocaleDateString('en-IN', {
                                                        month: 'long',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    {isEditing && (
                                        <div className="mt-4 pt-3 border-top">
                                            <Button
                                                variant="primary"
                                                className="rounded-pill px-4 py-2 fw-bold"
                                                onClick={handleSave}
                                            >
                                                <Save size={16} className="me-2" /> Save Changes
                                            </Button>
                                        </div>
                                    )}
                                </Form>

                                <hr className="my-5" />

                                {/* Account Stats */}
                                <h5 className="fw-bold mb-4">Account Overview</h5>
                                <Row className="g-3">
                                    <Col sm={4}>
                                        <Card className="border-0 bg-light rounded-4 p-3 text-center">
                                            <h3 className="fw-bold text-primary mb-1">0</h3>
                                            <p className="small text-secondary mb-0">Total Orders</p>
                                        </Card>
                                    </Col>
                                    <Col sm={4}>
                                        <Card className="border-0 bg-light rounded-4 p-3 text-center">
                                            <h3 className="fw-bold text-primary mb-1">0</h3>
                                            <p className="small text-secondary mb-0">Wishlist Items</p>
                                        </Card>
                                    </Col>
                                    <Col sm={4}>
                                        <Card className="border-0 bg-light rounded-4 p-3 text-center">
                                            <h3 className="fw-bold text-primary mb-1">₹0</h3>
                                            <p className="small text-secondary mb-0">Total Spent</p>
                                        </Card>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProfilePage;
