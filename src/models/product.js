// eslint-disable-next-line no-unused-vars
const { promise } = require('../config/database')
const connection = require('../config/database')

const updateWallet = (amount, id) => {
  return new Promise((resolve, reject) => {
    connection.query('update wallet set ? where id_user = ?', [amount, id], (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

module.exports = {
  updateWallet
}
