const express = require('express')
const route = express.Router()
const sellerController = require('../controller/seller')

route.post('/register', sellerController.register)

module.exports = route