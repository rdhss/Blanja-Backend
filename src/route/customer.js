const express = require('express')
const userController = require('../controller/user')
const walletController = require('../controller/wallet')
const validation = require('../helper/common')
const transController = require('../controller/transaction')
const route = express.Router()

route.get('/:id/balance', validation.checkUser, userController.userBalance) //check balance
route.get('/:id', validation.checkUser, userController.seeProfile) //see profile
route.put('/:id/profile', validation.checkUser, userController.changeName) //change profile
route.put('/:id/profile/pin', validation.checkUser, userController.changePin) //change pin
route.put('/:id/profile/phone', validation.checkUser, userController.changePhone) //change phone
route.put('/:id/top-up', validation.checkUser, walletController.topUp) // top up wallet
route.post('/:id/transaction', validation.checkUser, transController.transferDetail) // make invoice
route.put('/:id/transaction/:invoice', validation.checkUser, transController.confirm) // confirm transfer
route.delete('/:id/transaction/:invoice/c', validation.checkUser, transController.cancelTransfer) // cancel transfer
route.get('/:id/transaction/history', validation.checkUser, transController.history) // see history transaction
route.get('/:id/transaction/:invoice', validation.checkUser, transController.detailTransfer) // see transfer


module.exports = route



