const express = require('express');
const path = require("path");

const router = express.Router();
const Shop = require('../controllers/ShopDetails');

//Getting the product deetails
router.post('/product', Shop.postaddproduct);
router.post('/category', Shop.category);

module.exports = router;

 