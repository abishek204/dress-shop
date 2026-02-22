import { useContext } from 'react';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, LogOut, Settings } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

const AppNavbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <Navbar bg="white" expand="lg" sticky="top" className="navbar">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 text-primary">
                    DRESS<span className="text-dark">ME</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto fw-medium">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/products">Shop</Nav.Link>
                        <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                    </Nav>
                    <Nav className="align-items-center">
                        <Nav.Link as={Link} to="/cart" className="position-relative me-3">
                            <ShoppingBag size={22} />
                            {cartCount > 0 && (
                                <Badge pill bg="primary" className="position-absolute top-0 start-100 translate-middle" style={{ fontSize: '0.65rem' }}>
                                    {cartCount}
                                </Badge>
                            )}
                        </Nav.Link>
                        {user ? (
                            <NavDropdown title={<User size={22} />} id="user-dropdown" align="end">
                                <NavDropdown.Item disabled>Hi, {user.name}</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/my-orders">My Orders</NavDropdown.Item>
                                {user.role === 'admin' && (
                                    <>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={Link} to="/admin">
                                            <Settings size={16} className="me-2" /> Admin Dashboard
                                        </NavDropdown.Item>
                                    </>
                                )}
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>
                                    <LogOut size={16} className="me-2" /> Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Nav.Link as={Link} to="/login" className="btn btn-primary text-white px-4 ms-2">
                                Login
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
