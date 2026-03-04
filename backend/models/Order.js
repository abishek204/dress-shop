const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user: { type: DataTypes.UUID, allowNull: false },
    orderItems: { type: DataTypes.JSON, allowNull: false },
    shippingAddress: { type: DataTypes.JSON, allowNull: false },
    paymentMethod: { type: DataTypes.STRING, allowNull: false },
    paymentResult: { type: DataTypes.JSON },
    taxPrice: { type: DataTypes.FLOAT, defaultValue: 0.0 },
    shippingPrice: { type: DataTypes.FLOAT, defaultValue: 0.0 },
    totalPrice: { type: DataTypes.FLOAT, defaultValue: 0.0 },
    isPaid: { type: DataTypes.BOOLEAN, defaultValue: false },
    paidAt: { type: DataTypes.DATE },
    isDelivered: { type: DataTypes.BOOLEAN, defaultValue: false },
    deliveredAt: { type: DataTypes.DATE },
});

Object.defineProperty(Order.prototype, '_id', {
    get() {
        return this.id;
    }
});

module.exports = Order;
