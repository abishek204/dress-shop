const { Sequelize } = require('sequelize');
const path = require('path');
const os = require('os');

// Vercel serverless functions have a read-only filesystem except for the /tmp directory
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV;
const storagePath = isVercel
    ? path.join('/tmp', 'dress-website.sqlite')
    : path.join(__dirname, '..', 'dress-website.sqlite');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: storagePath,
    logging: false
});

module.exports = sequelize;
