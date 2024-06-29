const express = require("express")
const router = express.Router()
const currencyController = require("../controllers/currencyController")

router.route("/").post(currencyController.addCurrency)
router.route("/").get(currencyController.getCurrencies)

module.exports = router