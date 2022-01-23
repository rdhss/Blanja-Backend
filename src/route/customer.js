const express = require('express')
const route = express.Router()
const customerController = require('../controller/customer')
const productController = require('../controller/product')


route.get('/all-product', productController.listProduct)
route.get('/product/:id', productController.detailProduct)
route.get('/profile/:id', customerController.profile)
route.get('/address/:id', customerController.getAddress)
route.put('/address/update/:id', customerController.changeAddress)
route.get('/product', productController.searchProduct)
route.get('/product/category/:category', productController.category)
route.post('/address/new/:id', customerController.postAddress)
route.put('/profile/update/:id', customerController.changeName)

module.exports = route



