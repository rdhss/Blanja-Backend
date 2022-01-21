const createError = require('http-errors')
const standartRespons = require('../helper/response')
const productModel = require('../models/product')
const bcrypt = require('bcrypt')
const { param } = require('express/lib/request')

const addProduct = async (req, res, next) => {
    try {
        const { Name, price, qty, category, photo1, photo2, photo3, photo4, conditions, description } = req.body
        const store = req.params.storename
        const idUser = Math.floor(Math.random() * 999999)
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
            id: idUser
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

const listProduct = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 8
        const offset = (page - 1) * limit
        const productAll = await productModel.productPage(limit, offset)
        const allProduct = await productModel.countProduct()
        const { total } = allProduct[0]
        console.log(total)
        standartRespons.respons(res, productAll, 200, 'all product', {
            currentPage: page,
            limit: limit,
            totalData: total,
            totalPage: Math.ceil(total / limit)
        })
    }
    catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const detailProduct = async (req, res, next) => {
    try {
        const param = req.params.id
        console.log(param)
        const product = await productModel.selectProduct(param)
        console.log(product == 0)
        if (product == 0) {
            standartRespons.respons(res, null, 200, 'product not found :(')
        } else {
            standartRespons.respons(res, product, 200, 'success get product')
        }
    }
    catch (error) {

        const err = new createError.InternalServerError()
        next(err)
    }
}


module.exports = {
    addProduct,
    listProduct,
    detailProduct,
    
}