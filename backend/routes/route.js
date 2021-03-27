const express = require('express');
const router = express.Router();
const db = require('../config/database');
const products = require('../models/products');
const productsController = require('../controllers/ProductsController');
const cheerio = require('cheerio');
const request = require('request');
const { response } = require('express');

router.get('/', (req, res) => 
    products.findAll()
    .then(prds => {
        res.sendStatus(200);
    })
    .catch(err => console.log(err)));

router.get('/getProducts', productsController.getProducts);

//Add a product
router.post('/addProduct', (req, res) => {
    const reqUrl = req.body.url;
    console.log(reqUrl);

    var url = reqUrl;
    m = url.match("/([A-Z0-9]{10})")
    console.log(url, m);
    if (m) { 
        const id = m[1];
        const name = "Product " + id;
        const url = "https://www.amazon.com/dp/" + id;
        const img_url = "https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=" + id + "&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=AC_SL500";
        console.log(id);
        console.log(url);
        console.log(img_url);

        const data = {id, name, url, img_url};

            console.log(data);

            products.create({
                id,
                name,
                url,
                img_url,
            })
                .then(prd => res.json(prd))
                .catch(err => {
                    res.send(err);
                    console.log(err);
                });
    }
});

module.exports = router;