const connection = require('../config/database')

const createCustomer = (data) => {
    return new Promise((resolve,reject) => {
        connection.query('insert into customer set ?', data, (err, results) => {
            if (err) {
              reject(err)
            } else {
              resolve(results)
            }
        })
    })
}

const readAllcustomer = () => {
    return new Promise((resolve,reject) => {
        connection.query('select * from customer', (err, results) => {
            if (err) {
              reject(err)
            } else {
              resolve(results)
            }
        })
    })
}

const readAllcustomer2 = (idUser) => {
    return new Promise((resolve, reject) => {
      connection.query(`select * from customer where email = "${idUser}"`, (error, result) => {
        if (error) {
          console.log(error)
          reject('data error')
        } else {
          resolve(result)
        }
      })
    })
  }

const selectUser = (id) => {
    return new Promise((resolve,reject) => {
        connection.query(`select * from customer where id=${id}`, (err, results) => {
            if (err) {
              reject(err)
            } else {
              resolve(results)
            }
        })
    })
}

module.exports ={
    createCustomer,
    readAllcustomer,
    readAllcustomer2,
    selectUser
}