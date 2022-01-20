// eslint-disable-next-line no-unused-vars
const { promise } = require('../config/database')
const connection = require('../config/database')

const seeWalletDetail = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
            `SELECT * FROM wallet where id_user = ${id}`,
            (err, results) => {
              if (err) {
                reject(err)
              } else {
                resolve(results)
              }
            }
    )
  })
}

// eslint-disable-next-line no-unused-vars
const createTransfer = (data, mybalance) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO transaction set ?', data, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

const updateWalletSender = (data, id) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE wallet set ? where id = ?', [data, id], (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

const readDetailTransfer = (invoice) => {
  return new Promise((resolve, reject) => {
    connection.query('select * from transaction where invoice = ?', invoice, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

const updateWalletT = (amount, id) => {
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

const updatestatus = (invoice) => {
  return new Promise((resolve, reject) => {
    connection.query('update transaction set status = "success" where invoice = ?', invoice, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

const getHistory = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`select invoice,receiver,amount,date,status from transaction where id_sender = ${id} order by date desc`, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

const deleteInvoice = (invoice) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM transaction WHERE invoice = ${invoice}`, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

const seeInvoice = (invoice) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM transaction WHERE invoice = ${invoice}`, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}
module.exports = {
  seeWalletDetail,
  createTransfer,
  updateWalletSender,
  readDetailTransfer,
  updateWalletT,
  updatestatus,
  getHistory,
  seeInvoice,
  deleteInvoice
}
