const createError = require('http-errors')
const standartRespons = require('../helper/response')
const costumerModel = require('../models/customer')
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
        if(checkEmail.includes(email)){
            return next(createError(401,'this is email already registered'))
        } else {
            const result = await costumerModel.createCustomer(data)
            standartRespons.respons(res, null, 200, 'register success')
        }
    }
    catch (error) {
        next(new createError.InternalServerError)
    }
}

const login = async(req, res, next) => {
    const { email , password } = req.body
    const login = await costumerModel.readAllcustomer2(email)
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

module.exports = {
    register,
    login
}