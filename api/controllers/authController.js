const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { errorHandler } = require('../util/errorHandler')
const jwt = require('jsonwebtoken')

const signUp = async (req, res, next) => {
    const { username, password } = req.body
    console.log(username, password)

    if (!username || !password) {
        return next(errorHandler(400, "All fields are required!"))
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({
        username,
        password: hashedPassword
    })

    try {
        await newUser.save()
        res.status(201).json("User create successfully")
    } catch (error) {
        next(error)
    }
}

const signIn = async (req, res, next) => {
    const { username, password } = req.body
    console.log(username, password)

    if (!username || !password) {
        return next(errorHandler(400, "All fields are required!"))
    }

    try {
        const validUser = await User.findOne({ username })
        if (!validUser) {
            return next(errorHandler(404, "User not found : Wrong Email"))
        }

        const validPassword = bcryptjs.compare(password, validUser.password)
        if (!validPassword) {
            return next(errorHandler(401, "Wrong Password"))
        }

        // Remove validUser's password
        const {password: pass, ...rest} = validUser._doc

        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }

    // res.status(200).json({message: "signIn api working"})
}

module.exports = {
    signUp,
    signIn,
}