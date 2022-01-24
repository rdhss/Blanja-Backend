const connection = require('../config/database')

const createProduct = (data) => {
  return new Promise((resolve, reject) => {
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
  return new Promise((resolve, reject) => {
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
  return new Promise((resolve, reject) => {
    connection.query('select * from product', (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

const productDelete = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`delete from product where id=${id}`, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}


const selectProduct = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`select * from product where id=${id}`, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

const productPage = (limit, offset) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM product ORDER BY created_at DESC LIMIT ? OFFSET ? ', [limit, offset],
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

const countProduct = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT COUNT(*) as total FROM product', (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const productLike = (name) => {
  return new Promise((resolve,reject) => {
      connection.query(`select * from product where name like '%${name}%'`, (err, results) => {
          if (err) {
            reject(err)
          } else {
            resolve(results)
          }
      })
  })
}


const categorySelect = (cat) => {
  return new Promise((resolve,reject) => {
      connection.query(`select * from product where category='${cat}'`, (err, results) => {
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
  selectProduct,
  productPage,
  countProduct,
  productLike,
  categorySelect,
  productDelete
}