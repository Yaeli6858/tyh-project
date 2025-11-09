const mongoose = require("mongoose")
const cartSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    prodId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref: "Product"
    },
    count:{
        type:Number,
        required:true,
        default:1
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String
    },
    category:{
        type:String
    }
},{timestamps: true})

module.exports = cartSchema