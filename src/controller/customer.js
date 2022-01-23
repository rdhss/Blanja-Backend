const createError = require('http-errors')
const standartRespons = require('../helper/response')
const costumerModel = require('../models/customer')
const addressModel = require('../models/address')
const bcrypt = require('bcrypt')



const register = async (req, res, next) => {
    try {
        const { name, password, email } = req.body
        const idUser = Math.floor(Math.random() * 999999)
        const hashPass = await bcrypt.hash(password, 10)
        const data = {
            id: idUser,
            name: name,
            password: hashPass,
            email: email
        }
        const alluser = await costumerModel.readAllcustomer()
        const checkEmail = alluser.map(email => email.email)
        console.log(checkEmail)
        if (checkEmail.includes(email)) {
            return next(createError(401, 'this is email already registered'))
        } else {
            const result = await costumerModel.createCustomer(data)
            standartRespons.respons(res, null, 200, 'register success')
        }
    }
    catch (error) {
        next(new createError.InternalServerError)
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body
    const login = await costumerModel.readAllcustomer2(email)
    console.log(login)
    if (login == 0) {
        next(createError(401, 'user not registered'))
    }
    const hashPass = login[0].password
    const passHash = await bcrypt.compare(password, hashPass)
    if (passHash) {
        console.log(login)
        standartRespons.respons(res, login, 200, `welcome back ${login[0].Name}`)
    } else {
        next(createError(401, 'wrong password'))
    }
}

const profile = async (req, res, next) => {
    try {
        const userId = req.params.id
        const detail = await costumerModel.selectUser(userId)
        if (detail == 0) {
            standartRespons.respons(res, null, 200, 'id not registered')
        }
        standartRespons.respons(res, detail, 200, `hai ${detail[0].Name}`)
    }
    catch (error) {

        const err = new createError.InternalServerError()
        next(err)
    }
}

const getAddress = async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await addressModel.addressList(id)
        standartRespons.respons(res, result, 200, 'your address list')
    }
    catch (error) {

        const err = new createError.InternalServerError()
        next(err)
    }
}

const postAddress = async (req, res, next) => {
    try {
        const id = req.params.id
        const { saveas, receiptname, receiptphone, address, postalcode, city } = req.body
        const data = {
            id: id,
            saveas,
            receiptname,
            receiptphone,
            address,
            postalcode,
            city,
            id_address: Math.floor(Math.random() * 999999)
        }
        const result = await addressModel.createAddress(data)
        standartRespons.respons(res, null, 200, 'success add address')
    }
    catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const changeName = async (req, res, next) => {

    try {
        const idUser = req.params.id
        const { name, email, phone, gender, birth } = req.body
        const data = {
            name: name,
            email,
            phone,
            gender,
            birth
        }
        const result = await costumerModel.updateProfile(data, idUser)
        standartRespons.respons(res, data, 200, 'profile has been update')


    } catch (error) {
        next(createError.InternalServerError)
    }
}

const changeAddress = async (req, res, next) => {

    try {
        const idUser = req.params.id
        const idAddress = req.query.id
        const { saveas, receiptname, receiptphone, address, postalcode, city } = req.body
        const data = {
            saveas,
            receiptname,
            receiptphone,
            address,
            postalcode,
            city,
        }
        const result = await addressModel.updateAddress(data, idUser,idAddress)
        standartRespons.respons(res, data, 200, 'address has been update')

    } catch (error) {
        next(createError.InternalServerError)
    }
}

module.exports = {
    register,
    login,
    profile,
    getAddress,
    postAddress,
    changeName,
    changeAddress
}