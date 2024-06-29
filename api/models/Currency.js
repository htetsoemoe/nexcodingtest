const mongoose = require("mongoose")

const currencySchema = mongoose.Schema(
    {
        currencyname: {
            type: String,
            required: true
        },
        exchangerate: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Currency", currencySchema)