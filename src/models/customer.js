/* eslint-disable no-unused-vars */
// const { promise } = require('../config/database');
const { promise } = require('../config/database')
const connection = require('../config/database')

const readAllUser = (limit, offset) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM user LIMIT ? OFFSET ?', [limit, offset],
      (error, results, fields) => {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      }
    )
  })
}

const readAllUser2 = () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user',
        (error, results, fields) => {
          if (error) {
            reject(error)
          } else {
            resolve(results)
          }
        }
      )
    })
  }

const searchUser = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
            `SELECT * from user where name like '%${id}%'`,
            (err, results, fields) => {
              if (err) {
                reject(err)
              } else {
                resolve(results)
              }
            }
    )
  })
}

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM user WHERE user_id = ${id}`, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

const readAllbalance = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM wallet where id_user = ?', id,
      (err, results, fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      }
    )
  })
}

const readBalance = (idUser) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT user.name, wallet.balance FROM user join wallet on (wallet.id_user = user.user_id) WHERE user_id = ${idUser}`, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

const readProfile = (idUser) => {
  return new Promise((resolve, reject) => {
    connection.query(`select * from user where user_id = ${idUser}`, (error, result) => {
      if (error) {
        console.log(error)
        reject('data error')
      } else {
        // console.log(result)
        resolve(result)
      }
    })
  })
}

const readProfile2 = (idUser) => {
  return new Promise((resolve, reject) => {
    connection.query(`select * from user where Email = "${idUser}"`, (error, result) => {
      if (error) {
        console.log(error)
        reject('data error')
      } else {
        // console.log(result)
        resolve(result)
      }
    })
  })
}

const updateProfile = (data, idUser) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE user SET ? WHERE user_id = ?', [data, idUser], (error, result) => {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

const createUser = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO user set ?', data, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

const createWallet = (idWallet) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO wallet set ?', { id_user: idWallet }, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

const countProduct = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT COUNT(*) AS total FROM user', (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

module.exports = {
  readAllUser,
  readAllUser2,
  readBalance,
  readProfile,
  readProfile2,
  updateProfile,
  readAllbalance,
  createUser,
  createWallet,
  searchUser,
  deleteUser,
  countProduct
}
