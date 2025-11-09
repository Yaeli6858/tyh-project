const express = require("express")
const router = express.Router()
const verifyJWT = require("../middleWare/verifyJWT")
const authController = require("../Controllers/authControl")
router.post("/Login", authController.login)
router.post("/Register", authController.register)
module.exports = router