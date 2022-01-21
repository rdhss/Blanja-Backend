const connection = require('../config/database')

const createAddress = (data) => {
    return new Promise((resolve,reject) => {
        connection.query('insert into address set ?', data, (err, results) => {
            if (err) {
              reject(err)
            } else {
              resolve(results)
            }
        })
    })
}

const addressList = (id) => {
    return new Promise((resolve,reject) => {
        connection.query(`select * from address where id=${id}`, (err, results) => {
            if (err) {
              reject(err)
            } else {
              resolve(results)
            }
        })
    })
}

module.exports = {
    addressList,
    createAddress
}