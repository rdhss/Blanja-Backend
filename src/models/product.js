const connection = require('../config/database')

const createProduct = (data) => {
    return new Promise((resolve,reject) => {
        connection.query('INSERT INTO product set ?', data, (err, results) => {
            if (err) {
              reject(err)
            } else {
              resolve(results)
            }
        })
    })
}

const validCategory = () => {
    return new Promise((resolve,reject) => {
        connection.query('SELECT * FROM category', (err, results) => {
            if (err) {
              reject(err)
            } else {
              resolve(results)
            }
        })
    })
}


const productAll = () => {
    return new Promise((resolve,reject) => {
        connection.query('select * from product', (err, results) => {
            if (err) {
              reject(err)
            } else {
              resolve(results)
            }
        })
    })
}

const selectProduct = (id) => {
  return new Promise((resolve,reject) => {
      connection.query(`select * from product where id=${id}`, (err, results) => {
          if (err) {
            reject(err)
          } else {
            resolve(results)
          }
      })
  })
}

module.exports = {
    createProduct,
    validCategory,
    productAll,
    selectProduct
}