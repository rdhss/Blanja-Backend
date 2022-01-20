const express = require('express')
const route = express.Router()
const customerController = require('../controller/customer')


route.post('/register', customerController.register)

module.exports = route



