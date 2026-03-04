const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    items: {
        type: DataTypes.JSON,
        defaultValue: [],
    }
});

Object.defineProperty(Cart.prototype, '_id', {
    get() {
        return this.id;
    }
});

module.exports = Cart;
