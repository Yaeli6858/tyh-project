const Product = require("../models/Products");
const User = require("../models/User");

// צפיה בכל המוצרים שבסל קניות של המשתמש
const getAllProducts = async (req, res) => {
    // find user
    const user = await User.findById(req.user._id)
    if (!user) {
        return res.status(400).json({ message: 'user not found' })
    }
    // get its cart
    res.json(user.cart)
}


//הוספת מוצר
const addProduct = async (req, res) => {
    const { id, qty } = req.body
    if (!id) {
        return res.status(400).json({ message: 'require' })
    }
    const prod = await Product.findById(id)
    if (!prod) {
        return res.status(400).json({ message: 'prod not found' })
    }
    const user = await User.findById(req.user._id)
    if (!user) {
        return res.status(400).json({ message: 'user not found' })
    }
    const prodInCart = user.cart.find(p=>p.prodId==id)
    if (prodInCart) {
        req.body.count = prodInCart.count+qty
        return updateProduct(req,res)
    }
    const newProd = user.cart.create({ prodId: prod._id, name: prod.name, count:qty, price: prod.price , category: prod.category})
    user.cart = [...user.cart, newProd]
    await user.save()
    res.json(user.cart)
}

//עדכון בלוג
const updateProduct = async (req, res) => {
    const { id, count } = req.body
    if (!id || !count) {
        return res.status(403).json({ message: 'require' })
    }
    const user = await User.findById(req.user._id)
    if (!user) {
        return res.status(401).json({ message: 'user not found' })
    }
    const prod = user.cart.find(p=>p.prodId==id)
    if (!prod) {
        return res.status(402).json({ message: 'prod not found' })
    }
    prod.count = count
    await user.save()
    res.json(user.cart)
}

//מחיקת בלוג
const deleteProduct = async (req, res) => {
    const { id } = req.body
    const user = await User.findById(req.user._id).exec()
    if (!user) {
        return res.status(400).json({ message: 'user not found' })
    }
   
    
    user.cart = user.cart.filter((prod) => {
        console.log(prod.prodId, "prodId");
        console.log(id, "id");
        return prod.prodId != id
    })
    await user.save()
    res.json(user.cart)
}

module.exports = {
    getAllProducts,
    deleteProduct,
    addProduct,
    updateProduct
}