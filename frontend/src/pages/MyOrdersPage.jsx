import { useState, useEffect, useContext } from 'react';
import { Container, Table, Badge, Button, Card } from 'react-bootstrap';
import api from '../api/config';
import { ShoppingBag, Package, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Using the local API - this will be intercepted by Demo Mode if DB is down
                const { data } = await api.get('/api/orders/myorders', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    if (loading) return (
        <Container className="py-5 text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </Container>
    );

    return (
        <div className="py-5 bg-light min-vh-100">
            <Container>
                <div className="d-flex align-items-center gap-3 mb-5">
                    <div className="bg-primary p-3 rounded-4 shadow-sm text-white">
                        <Package size={30} />
                    </div>
                    <div>
                        <h2 className="fw-bold mb-0">My Orders</h2>
                        <p className="text-secondary mb-0">Track and manage your dress collection history</p>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <Card className="border-0 shadow-sm rounded-4 py-5 text-center">
                        <Card.Body>
                            <ShoppingBag size={80} className="text-secondary mb-4 opacity-25" />
                            <h3 className="fw-bold text-dark mb-3">No orders found</h3>
                            <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: '400px' }}>
                                You haven't placed any orders yet. Start exploring our latest Indian and Western collections!
                            </p>
                            <Button as={Link} to="/products" variant="primary" className="px-5 py-2 rounded-pill fw-bold">
                                Start Shopping
                            </Button>
                        </Card.Body>
                    </Card>
                ) : (
                    <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                        <div className="table-responsive">
                            <Table hover className="mb-0 align-middle">
                                <thead className="bg-white">
                                    <tr className="border-bottom">
                                        <th className="px-4 py-3 text-secondary small text-uppercase">Order ID</th>
                                        <th className="py-3 text-secondary small text-uppercase">Date</th>
                                        <th className="py-3 text-secondary small text-uppercase">Total</th>
                                        <th className="py-3 text-secondary small text-uppercase">Paid</th>
                                        <th className="py-3 text-secondary small text-uppercase">Status</th>
                                        <th className="py-3 border-0"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id}>
                                            <td className="px-4 py-4 fw-bold text-primary">#{order._id}</td>
                                            <td className="py-4 text-secondary">
                                                {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </td>
                                            <td className="py-4 fw-bold text-dark">₹{order.totalPrice}</td>
                                            <td className="py-4">
                                                {order.isPaid ? (
                                                    <Badge bg="success-subtle" className="text-success border border-success-subtle px-3 py-2 rounded-pill">
                                                        Paid
                                                    </Badge>
                                                ) : (
                                                    <Badge bg="danger-subtle" className="text-danger border border-danger-subtle px-3 py-2 rounded-pill">
                                                        Not Paid
                                                    </Badge>
                                                )}
                                            </td>
                                            <td className="py-4">
                                                {order.isDelivered ? (
                                                    <Badge bg="primary-subtle" className="text-primary border border-primary-subtle px-3 py-2 rounded-pill">
                                                        Delivered
                                                    </Badge>
                                                ) : (
                                                    <Badge bg="warning-subtle" className="text-warning border border-warning-subtle px-3 py-2 rounded-pill">
                                                        Processing
                                                    </Badge>
                                                )}
                                            </td>
                                            <td className="py-4 text-end px-4">
                                                <Button
                                                    as={Link}
                                                    to={`/order/${order._id}`}
                                                    variant="light"
                                                    className="rounded-circle p-2 shadow-sm"
                                                >
                                                    <ChevronRight size={20} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Card>
                )}
            </Container>
        </div>
    );
};

export default MyOrdersPage;
