const modelWallet = require('../models/wallet')
const responsStandart = require('../helper/common')
const userModel = require('../models/user')


// eslint-disable-next-line no-unused-vars
const topUp = async (req, res, next) => {
  const idUser = req.params.id
  const balance = req.body.balance
  const test = await userModel.readBalance(idUser)
  console.log(test[0].balance)
  const data = {
    balance: test[0].balance + balance 
  }

  // eslint-disable-next-line no-unused-vars
  const result = await modelWallet.updateWallet(data, idUser)
  responsStandart.respons(res, null, 200, 'success top-up')
}

module.exports = {
  topUp
}
