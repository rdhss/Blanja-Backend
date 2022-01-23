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

const updateAddress = (data, idUser, idAddress) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE address SET ? WHERE id = ? and id_address = ?' , [data, idUser, idAddress], (error, result) => {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = {
    addressList,
    createAddress,
    updateAddress
}