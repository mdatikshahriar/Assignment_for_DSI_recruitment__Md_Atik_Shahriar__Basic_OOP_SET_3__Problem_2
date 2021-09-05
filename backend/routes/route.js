const express = require('express');
const router = express.Router();
const db = require('../config/database');
const products = require('../models/products');
const productsController = require('../controllers/ProductsController');

router.get('/', (req, res) => 
    products.findAll()
    .then(prds => {
        res.sendStatus(200);
    })
    .catch(err => console.log(err)));

router.get('/getProducts', productsController.getProducts);

//Add a product
router.post('/addProduct', productsController.addProduct);

//Delete a product
router.delete("/deleteProduct", productsController.deleteProduct);

module.exports = router;