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
            id: idUser,
            created_at: new Date()
        }
        const categorylist = await productModel.validCategory()
        const check = categorylist.map(ca => ca.name)
        console.log(data)
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


const searchProduct = async (req, res, next) => {
    try {
        const { name } = req.query
        const result = await productModel.productLike(name)
        if (result == 0) {
            standartRespons.respons(res, result, 200, 'product not found :(')
        }
        standartRespons.respons(res, result, 200, 'success get product')
    }
    catch (error) {

        const err = new createError.InternalServerError()
        next(err)
    }
}

const category = async (req, res, next) => {
    try {
        const name = req.params.category
        console.log(name)
        const categorylist = await productModel.validCategory()
        const check = categorylist.map(ca => ca.name)
        if(check.includes(name)){
            const result = await productModel.categorySelect(name)
            standartRespons.respons(res, result, 200, `all product in ${name}`)
        } else{
            next(createError(401, 'category not found'))
        }
    }
    catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const idProduct = req.params.id
        const result = await productModel.productDelete(idProduct)
        standartRespons.respons(res, result, 200, 'success detele')
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
    searchProduct,
    category,
    deleteProduct
}