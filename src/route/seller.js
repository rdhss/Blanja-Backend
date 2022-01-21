const express = require('express')
const route = express.Router()
const sellerController = require('../controller/seller')
const productController = require('../controller/product')

route.post('/:storename/add-product', productController.addProduct)

module.exports = route