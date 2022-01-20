require('dotenv').config()
const express = require('express')
// const userController = require('./src/controller/user')
const helperCommon = require('./src/helper/common')
const adminRoute = require('./src/route/admin')
const userRoute = require('./src/route/user')
const authRoute = require('./src/route/auth')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const PORT = process.env.PORT || 1234


// middleware
app.use(express.json())
app.use(cors())

// middleware-logging
app.use(morgan('dev'))

// (admin)
app.use('/admin', adminRoute)

// portal
app.use('/auth', authRoute)

// (user)
app.use('/user', userRoute)

// transaction

// history

// seach by name

// url not found
app.use(helperCommon.url)

// error handling
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err)
  // res.status(err.status).send(err.message)
  helperCommon.respons(res, null, err.status, err.message)
})

// listen
app.listen(PORT, () => {
  console.log('server running....')
})
