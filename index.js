require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const routeAuth = require('./src/route/auth')
const routeCustomer = require('./src/route/customer')
const routeSeller = require('./src/route/seller')
const helperCommon = require('./src/helper/common')
const standartResponse = require('./src/helper/response')



const PORT = 1234


// middleware
app.use(express.json())
app.use(cors())

// middleware-logging
app.use(morgan('dev'))

// customer
app.use('/customer', routeCustomer)

// seller
app.use('/seller', routeSeller)

// auth
app.use('/auth', routeAuth)

// error
app.use((err, req, res, next) => {
  console.log(err)
  standartResponse.respons(res, null, err.status, err.message)
})

// url not found
app.use(helperCommon.url)



// listen
app.listen(PORT, () => {
    console.log('server running....')
  })
  


