const createError = require('http-errors')
const standartRespons = require('../helper/response')
const productModel = require('../models/product')
const bcrypt = require('bcrypt')

const addProduct = async (req, res, next) => {
    try {
        const { Name, price, qty, category, photo1, photo2, photo3, photo4, conditions, description } = req.body
        const store = req.params.storename
        const data = {
            namestore: store,
            Name,
            price,
            qty,
            category,
            photo1,
            photo2,
            photo3,
            photo4,
            conditions,
            description,
        }
        const categorylist = await productModel.validCategory()
        const check = categorylist.map(ca => ca.name)
        console.log(check)
        if (check.includes(category)) {
            const result = await productModel.createProduct(data)
            standartRespons.respons(res, null, 200, 'success add product')
        } else {
            next(createError(401, 'category not found'))
        }
    }
    catch (error) {

        const err = new createError.InternalServerError()
        next(err)
    }
}

module.exports = {
    addProduct
}