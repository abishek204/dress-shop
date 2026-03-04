const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    _id: {
        type: DataTypes.VIRTUAL,
        get() {
            return this.id;
        }
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    images: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: []
    },
    user: {
        type: DataTypes.UUID,
    },
    sizes: { type: DataTypes.JSON, defaultValue: [] },
    colors: { type: DataTypes.JSON, defaultValue: [] },
    countInStock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    rating: { type: DataTypes.FLOAT, defaultValue: 0 },
    numReviews: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
    // This ensures VIRTUALS are included in JSON
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

module.exports = Product;
