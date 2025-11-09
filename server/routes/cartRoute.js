const express = require("express")
const router = express.Router()

const routcon = require("../Controllers/cartControl")
const verifyJWT = require("../middleWare/verifyJWT")


router.use(verifyJWT)

router.get("/",routcon.getAllProducts)
router.put("/", routcon.updateProduct)
router.post("/", routcon.addProduct)
router.delete("/",routcon.deleteProduct)

module.exports = router