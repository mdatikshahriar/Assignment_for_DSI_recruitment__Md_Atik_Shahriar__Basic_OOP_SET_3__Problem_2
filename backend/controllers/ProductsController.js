"use strict";

const products = require("../models/products");

exports.getProducts = async (req, res) => {
  products.findAll()
    .then(prds => {
        if (prds === null) {
          res.status(404).json("No products found");
          return;
        } else {
          res.status(200).json(prds);
          return;
        }
    })
    .catch(err => {
      res.status(404).json("No products found");
      console.log(err);
    });
  };