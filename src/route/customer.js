const express = require('express')
const route = express.Router()
const customerController = require('../controller/customer')
const productController = require('../controller/product')


route.get('/all-product', productController.listProduct)
route.get('/product/:id', productController.detailProduct)
route.get('/:id/profile', customerController.profile)
route.get('/:id/address', customerController.getAddress)
route.put('/:id/address/update', customerController.changeAddress)
route.get('/product', productController.searchProduct)
route.get('/product/category/:category', productController.category)
route.post('/:id/address/new', customerController.postAddress)
route.put('/:id/profile/update', customerController.changeName)

module.exports = route



