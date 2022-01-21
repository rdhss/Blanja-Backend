const createError = require('http-errors')
const standartRespons = require('../helper/response')
const bcrypt = require('bcrypt')
const sellerModel = require('../models/seller')

const register = async (req, res, next) => {
    try {
        const { name, password, email , storename, phone} = req.body
        const idUser = Math.floor(Math.random() * 999999)
        const hashPass = await bcrypt.hash(password, 10)
        const data = {
            id: idUser,
            name: name,
            email: email,
            phone: phone,
            storename: storename,
            password: hashPass
        }
        const alluser = await sellerModel.readAllSeller()
        const checkEmail = alluser.map(email => email.email)
        const checkStote = alluser.map(user => user.storename)
        console.log(alluser)
        if(checkEmail.includes(email) || checkStote.includes(storename)){
            return next(createError(401,'email or storename has been registered'))
        } else {
            const result = await sellerModel.createSeller(data)
            standartRespons.respons(res, null, 200, 'register success')
        }
    }
    catch (error) {
        const err = new createError.InternalServerError()
        next(err)
    }
}

const login = async(req, res, next) => {
    const { email , password } = req.body
    const login = await sellerModel.readAllSeller2(email)
    if(login == 0){ 
        next(createError(401, 'user not registered'))
    }
    const hashPass = login[0].password 
    const passHash = await bcrypt.compare(password, hashPass)
    if(passHash){
        standartRespons.respons(res, login, 200, `welcome back ${login[0].name}`)
    } else{
        next(createError(401, 'wrong password'))
    }
}



module.exports ={
    register,
    login
}