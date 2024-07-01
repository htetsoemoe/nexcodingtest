const Currency = require('../models/Currency')
const bcryptjs = require('bcryptjs')
const { errorHandler } = require('../util/errorHandler')
const jwt = require('jsonwebtoken')

const addCurrency = async (req, res, next) => {
    const { currencyname, exchangerate } = req.body
    console.log(currencyname, exchangerate)

    if (!currencyname || !exchangerate) {
        return next(errorHandler(400, "All fields are required!"))
    }

    try {
        const existedCurrency = await Currency.findOne({ currencyname: currencyname })
        // console.log(existedCurrency._id)

        if (existedCurrency) {
            const updatedCurrency = await Currency.findByIdAndUpdate(
                existedCurrency._id,
                {
                    $set: {
                        currencyname: currencyname,
                        exchangerate: exchangerate
                    }
                },
                { new: true }
            )
            res.status(201).json(updatedCurrency)
        } else {
            const newCurrency = await Currency.create(req.body)
            res.status(201).json(newCurrency)
        }
    } catch (error) {
        next(error)
    }
}

const getCurrencies = async (req, res, next) => {
    try {
        const currrencies = await Currency.find({})
        console.log(currrencies)
        return res.status(200).json(currrencies)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addCurrency,
    getCurrencies,
}