import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Alert, Badge } from 'react-bootstrap';
import { Settings, Trash2, Edit2, Plus, Package, X, Save } from 'lucide-react';
import api from '../api/config';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });
    
    // Modal states
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    
    // Form states
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'casual',
        description: '',
        countInStock: '',
        sizes: ['S', 'M', 'L', 'XL'],
        images: ['']
    });

    const categories = ['casual', 'party', 'traditional', 'formal', 'summer', 'wedding'];

    useEffect(() => {
        // Redirect if not admin
        if (user && user.role !== 'admin') {
            navigate('/');
        }
        fetchProducts();
    }, [user, navigate]);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/api/products');
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setFormData({
            name: product.name,
            price: product.price,
            category: product.category,
            description: product.description || '',
            countInStock: product.countInStock,
            sizes: product.sizes || ['S', 'M', 'L', 'XL'],
            images: product.images || ['']
        });
        setShowEditModal(true);
    };

    const handleDelete = (product) => {
        setSelectedProduct(product);
        setShowDeleteModal(true);
    };

    const handleAddNew = () => {
        setFormData({
            name: '',
            price: '',
            category: 'casual',
            description: '',
            countInStock: '',
            sizes: ['S', 'M', 'L', 'XL'],
            images: ['']
        });
        setShowAddModal(true);
    };

    const confirmDelete = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            };
            await api.delete(`/api/products/${selectedProduct._id}`, config);
            setProducts(products.filter(p => p._id !== selectedProduct._id));
            setMessage({ type: 'success', text: 'Product deleted successfully!' });
            setShowDeleteModal(false);
        } catch (error) {
            setMessage({ type: 'danger', text: 'Failed to delete product: ' + (error.response?.data?.message || error.message) });
        }
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const saveProduct = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            };
            const productData = {
                ...formData,
                price: Number(formData.price),
                countInStock: Number(formData.countInStock)
            };

            if (showEditModal) {
                const { data } = await api.put(
                    `/api/products/${selectedProduct._id}`,
                    productData,
                    config
                );
                setProducts(products.map(p => p._id === selectedProduct._id ? data : p));
                setMessage({ type: 'success', text: 'Product updated successfully!' });
                setShowEditModal(false);
            } else {
                const { data } = await api.post('/api/products', productData, config);
                setProducts([...products, data]);
                setMessage({ type: 'success', text: 'Product added successfully!' });
                setShowAddModal(false);
            }
        } catch (error) {
            setMessage({ type: 'danger', text: 'Failed to save product: ' + (error.response?.data?.message || error.message) });
        }
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSizeToggle = (size) => {
        setFormData(prev => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...prev.sizes, size]
        }));
    };

    if (!user || user.role !== 'admin') {
        return (
            <Container className="py-5 text-center">
                <h3 className="text-danger">Access Denied</h3>
                <p className="text-secondary">You need admin privileges to access this page.</p>
                <Button variant="primary" onClick={() => navigate('/')}>Go Home</Button>
            </Container>
        );
    }

    return (
        <div className="py-5 bg-light min-vh-100">
            <Container>
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div className="d-flex align-items-center gap-3">
                        <div className="bg-primary p-3 rounded-4 shadow-sm text-white">
                            <Settings size={30} />
                        </div>
                        <div>
                            <h2 className="fw-bold mb-0">Admin Dashboard</h2>
                            <p className="text-secondary mb-0">Manage your dress collection</p>
                        </div>
                    </div>
                    <Button variant="primary" className="rounded-pill px-4 py-2 fw-bold" onClick={handleAddNew}>
                        <Plus size={18} className="me-2" /> Add New Dress
                    </Button>
                </div>

                {message.text && (
                    <Alert variant={message.type} className="mb-4">{message.text}</Alert>
                )}

                {/* Stats Cards */}
                <Row className="g-4 mb-5">
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 p-4 text-center">
                            <h2 className="fw-bold text-primary mb-1">{products.length}</h2>
                            <p className="text-secondary mb-0">Total Products</p>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 p-4 text-center">
                            <h2 className="fw-bold text-success mb-1">
                                {products.filter(p => p.countInStock > 0).length}
                            </h2>
                            <p className="text-secondary mb-0">In Stock</p>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 p-4 text-center">
                            <h2 className="fw-bold text-danger mb-1">
                                {products.filter(p => p.countInStock <= 0).length}
                            </h2>
                            <p className="text-secondary mb-0">Out of Stock</p>
                        </Card>
                    </Col>
                </Row>

                {/* Products Table */}
                <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                    <Card.Header className="bg-white py-3 px-4 border-bottom">
                        <h5 className="fw-bold mb-0">
                            <Package size={20} className="me-2" /> All Products
                        </h5>
                    </Card.Header>
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <Table hover className="mb-0 align-middle">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="px-4 py-3">Image</th>
                                        <th className="py-3">Name</th>
                                        <th className="py-3">Category</th>
                                        <th className="py-3">Price</th>
                                        <th className="py-3">Stock</th>
                                        <th className="py-3 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product._id}>
                                            <td className="px-4 py-3">
                                                <img
                                                    src={product.images?.[0] || 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=100'}
                                                    alt={product.name}
                                                    className="rounded-3"
                                                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                                />
                                            </td>
                                            <td className="py-3">
                                                <strong>{product.name}</strong>
                                            </td>
                                            <td className="py-3">
                                                <Badge bg="light" text="primary" className="px-3 py-2 rounded-pill">
                                                    {product.category}
                                                </Badge>
                                            </td>
                                            <td className="py-3 fw-bold">₹{product.price}</td>
                                            <td className="py-3">
                                                <Badge bg={product.countInStock > 0 ? 'success' : 'danger'} className="px-3 py-2 rounded-pill">
                                                    {product.countInStock > 0 ? `${product.countInStock} in stock` : 'Out of stock'}
                                                </Badge>
                                            </td>
                                            <td className="py-3 text-center">
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    className="me-2 rounded-pill px-3"
                                                    onClick={() => handleEdit(product)}
                                                >
                                                    <Edit2 size={14} className="me-1" /> Edit
                                                </Button>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    className="rounded-pill px-3"
                                                    onClick={() => handleDelete(product)}
                                                >
                                                    <Trash2 size={14} className="me-1" /> Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Card>

                {/* Edit/Add Modal */}
                <Modal show={showEditModal || showAddModal} onHide={() => { setShowEditModal(false); setShowAddModal(false); }} size="lg" centered>
                    <Modal.Header className="border-0 pb-0">
                        <Modal.Title className="fw-bold">
                            {showEditModal ? 'Edit Product' : 'Add New Product'}
                        </Modal.Title>
                        <Button variant="link" className="text-secondary p-0" onClick={() => { setShowEditModal(false); setShowAddModal(false); }}>
                            <X size={24} />
                        </Button>
                    </Modal.Header>
                    <Modal.Body className="pt-4">
                        <Form>
                            <Row className="g-3">
                                <Col md={8}>
                                    <Form.Group>
                                        <Form.Label className="small fw-bold">Product Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter product name"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label className="small fw-bold">Price (₹)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            placeholder="0"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="small fw-bold">Category</Form.Label>
                                        <Form.Select name="category" value={formData.category} onChange={handleInputChange}>
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>
                                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="small fw-bold">Stock Quantity</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="countInStock"
                                            value={formData.countInStock}
                                            onChange={handleInputChange}
                                            placeholder="0"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label className="small fw-bold">Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            placeholder="Enter product description"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label className="small fw-bold">Image URL</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={formData.images[0]}
                                            onChange={(e) => setFormData(prev => ({ ...prev, images: [e.target.value] }))}
                                            placeholder="https://example.com/image.jpg"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Label className="small fw-bold">Available Sizes</Form.Label>
                                    <div className="d-flex gap-2">
                                        {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                            <Button
                                                key={size}
                                                variant={formData.sizes.includes(size) ? 'primary' : 'outline-secondary'}
                                                size="sm"
                                                onClick={() => handleSizeToggle(size)}
                                            >
                                                {size}
                                            </Button>
                                        ))}
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="border-0">
                        <Button variant="outline-secondary" className="rounded-pill px-4" onClick={() => { setShowEditModal(false); setShowAddModal(false); }}>
                            Cancel
                        </Button>
                        <Button variant="primary" className="rounded-pill px-4 fw-bold" onClick={saveProduct}>
                            <Save size={16} className="me-2" /> Save Product
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                    <Modal.Header className="border-0 pb-0">
                        <Modal.Title className="fw-bold text-danger">Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="mb-0">
                            Are you sure you want to delete <strong>{selectedProduct?.name}</strong>? This action cannot be undone.
                        </p>
                    </Modal.Body>
                    <Modal.Footer className="border-0">
                        <Button variant="outline-secondary" className="rounded-pill px-4" onClick={() => setShowDeleteModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="danger" className="rounded-pill px-4 fw-bold" onClick={confirmDelete}>
                            <Trash2 size={16} className="me-2" /> Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
};

export default AdminPage;
