const connection = require('../config/database')

const createSeller = (data) => {
    return new Promise((resolve,reject) => {
        connection.query('insert into seller set ?', data, (err, results) => {
            if (err) {
              reject(err)
            } else {
              resolve(results)
            }
        })
    })
}

const readAllSeller = () => {
    return new Promise((resolve,reject) => {
        connection.query('select * from seller', (err, results) => {
            if (err) {
              reject(err)
            } else {
              resolve(results)
            }
        })
    })
}

const readAllSeller2 = (idUser) => {
    return new Promise((resolve, reject) => {
      connection.query(`select * from seller where email = "${idUser}"`, (error, result) => {
        if (error) {
          console.log(error)
          reject('data error')
        } else {
          resolve(result)
        }
      })
    })
  }


module.exports ={
    createSeller,
    readAllSeller,
    readAllSeller2
}