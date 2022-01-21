const express = require('express')
const route = express.Router()
const customerController = require('../controller/customer')
const productController = require('../controller/product')


route.get('/all-product', productController.listProduct)
route.get('/product/:id', productController.detailProduct)
route.get('/:id/profile', customerController.profile)

module.exports = route



