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
})

module.exports = product;