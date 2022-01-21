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

module.exports = {
    createProduct,
    validCategory
}