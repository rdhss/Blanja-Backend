/* eslint-disable no-unused-vars */
const userModel = require('../models/user')
const createError = require('http-errors')
const standartRespons = require('../helper/common')
const bcrypt = require('bcrypt')

const userList = async (req, res, next) => {
  try {
    const name = req.query.name
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 2
    const offset = (page - 1) * limit
    console.log(typeof (req.query))
    const result = await userModel.readAllUser(limit, offset)
    const resultsearch = await userModel.searchUser(name)
    const resultCount = await userModel.countProduct()
    const { total } = resultCount[0]
    console.log(resultCount)
    if (Object.keys(req.query).length == 0) {
      standartRespons.respons(res, result, 200, 'data berhasil diambil',{currentPage: page,
      limit: limit,
      totalData: total,
      totalPage: Math.ceil(total / limit)})

    } else {
        standartRespons.respons(res, result, 200, 'data berhasil diambil',{currentPage: page,
        limit: limit,
        totalData: total,
        totalPage: Math.ceil(total / limit)})
    }
  } catch (error) {
    console.log(error)
    const err = new createError.InternalServerError()
    next(err)
  }
}


const deleteU = async (req, res, next) => {
  const userId = req.params.id
  const user = await userModel.readProfile(userId)
  const result = await userModel.deleteUser(userId)
  standartRespons.respons(res, user, 200, 'user deleted') 
}

const userBalance = async (req, res, next) => {
  try {
    const idUser = req.params.id
    const result = await userModel.readBalance(idUser)
    standartRespons.respons(res, result, 200, null)   
  } catch (error) {
    console.log(error)
    const err = new createError.InternalServerError()
    next(err)
  }
 
}

const seeProfile = async (req, res, next) => {
  const userId = req.params.id
  try {
    const result = await userModel.readProfile(userId)
    console.log(result)
    if (result == 0) {
      next(createError(401, 'user not found'))
    } else {
      res.send(result)
    }
  } catch (error) {
    next(createError.InternalServerError)
  }
}

const changeName = async (req, res, next) => {
  
  try {
    const idUser = req.params.id
    const { name } = req.body
    // const hashPass = await bcrypt.hash(password, 10)
    const data = {
      name: name
    }
    const result = await userModel.updateProfile(data, idUser)
    res.json({
      message: 'profile has been update'
    })
    
  } catch (error) {
    next(createError.InternalServerError)
  }
}

const changePin = async (req, res, next) => {
  
  try {
    const idUser = req.params.id
    const { pin } = req.body
    const data = {
      pin: pin 
    }
    const result = await userModel.updateProfile(data, idUser)
    res.json({
      message: 'pin has been update'
    })
    
  } catch (error) {
    next(createError.InternalServerError)
  }
}

const changePhone = async (req, res, next) => {
  
  try {
    const idUser = req.params.id
    const { phone } = req.body
    const data = {
      phone: phone
    }
    const result = await userModel.updateProfile(data, idUser)
    res.json({
      message: 'phone has been update'
    })
    
  } catch (error) {
    next(createError.InternalServerError)
  }
}

const registerUser = async (req, res, next) => {
  const { phone, name, email, password, pin } = req.body
  const idUser = Math.floor(Math.random() * 999)
  const hashPass = await bcrypt.hash(password, 10)
  const emailList = await userModel.readAllUser2()
  const emailList2 = emailList.map(email => email.Email)
  console.log(emailList)
  const data = {
    user_id: idUser,
    phone: phone,
    name: name,
    email: email,
    password: hashPass,
    pin: pin
  }
  const test = await bcrypt.compare(password, hashPass)
  console.log(test)
  const result = await userModel.createUser(data)
  const wallet = await userModel.createWallet(data.user_id)
  if(emailList2.includes(email)){
      next(createError(401,'this is email already registered'))
  } else {
      standartRespons.respons(res,`your id is ${data.user_id}`, 200, 'Register success' )
  }
}


const login = async(req, res, next) => {
    const { email , password } = req.body
    const login = await userModel.readProfile2(email)
    if(login == 0){
        next(createError(401, 'user not registered'))
    }
    const hashPass = login[0].password 
    const passHash = await bcrypt.compare(password, hashPass)
    if(passHash){
        standartRespons.respons(res, login, 200, `welcome back ${login[0].Name}`)
    } else{
        next(createError(401, 'wrong password'))
    }
}

const userlist2 = async(req, res, next) => {
  try {
    const result = await userModel.readAllUser2()
    // console.log(result)
    standartRespons.respons(res, result, 200, null)   
  } catch (error) {
    console.log(error)
    const err = new createError.InternalServerError()
    next(err)
  }
}

module.exports = {
  userList,
  userBalance,
  userlist2,
  changeName,
  changePin,
  changePhone,
  seeProfile,
  registerUser,
  deleteU,
  login
}
