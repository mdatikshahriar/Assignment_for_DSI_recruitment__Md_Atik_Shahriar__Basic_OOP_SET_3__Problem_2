const sequelize = require('sequelize');
const db = require('../config/database');

const product = db.define('product', {
    name: {
        type: sequelize.STRING
    },
    url: {
        type: sequelize.STRING
    },
    img_url: {
        type: sequelize.STRING
    },
    price: {
        type: sequelize.FLOAT
    },
})

module.exports = product;