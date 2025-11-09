const express = require("express")
const router = express.Router()
const routcon = require("../Controllers/prodControl")
const verifyJWTadmin = require("../middleWare/verifyJWTadmin")



router.get("/",routcon.getAllProducts)
router.get("/:id", routcon.getProdById)

router.use(verifyJWTadmin)

router.delete("/",routcon.deleteProduct)
router.post("/", routcon.addProduct)
router.put("/", routcon.updateProduct)
module.exports = router