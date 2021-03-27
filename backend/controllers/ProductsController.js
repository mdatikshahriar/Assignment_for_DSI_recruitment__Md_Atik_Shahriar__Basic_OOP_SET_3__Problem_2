"use strict";

const products = require("../models/products");
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

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

exports.addProduct = async (req, res) => {
  const reqUrl = req.body.url;
    console.log(reqUrl);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(reqUrl);

    const html = await page.evaluate(() => document.body.innerHTML);

    const $ = cheerio.load(html);

    const m = reqUrl.match("/([A-Z0-9]{10})");
    if(!m) {
      res.status(404).send("Invalid url");
      return;
    }
    const id = m[1];
    const name = $('#productTitle').text().trim();
    const url = "https://www.amazon.com/dp/" + id;
    const img_url = $('#landingImage').attr('src');
    const dollarPrice = $('#priceblock_dealprice').text() || $('#priceblock_ourprice').text();
    console.log(dollarPrice);
    const price = (84.58 * Number(dollarPrice.replace(/[^0-9.-]+/g,""))).toFixed(4);

    console.log(id, name, price, url, img_url, price);

    const data = {id, name, url, img_url, price};

    console.log(data);

    products.create({
        id,
        name,
        url,
        img_url,
        price,
    })
        .then(prd => res.json(prd))
        .catch(err => {
            res.status(209).send(err);
            console.log(err);
        });
};

exports.deleteProduct = async (req, res) => {
  const id = req.body.id;
  console.log(id);

  if (id === undefined) {
    res.status(400).json("Invalid Request");
    return;
  }

  let product = await products.findOne({where: {id: id}}).catch(e => {
    console.log(e.message);
    res.status(400).json("Invalid Request");
  })
  if (!product){
    console.log("err");
    res.status(400).json("Invalid Request");
    return;
  }
  product.destroy();
  res.status(204).json("Deleted Successfully");
};