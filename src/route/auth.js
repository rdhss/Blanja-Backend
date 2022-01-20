const express = require('express')
const route = express.Router()
const customerController = require('../controller/customer')
const sellerController = require('../controller/seller')


route.post('/login/customer', customerController.login)
route.post('/login/seller', sellerController.login) 
route.post('/register/customer', customerController.register)
route.post('/register/seller', sellerController.register)

module.exports = route
