const mongoose = require("mongoose")
const prodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        required:true 
    },
    category:{
        type:String,
        required:true
    }
},{timestamps: true})

module.exports = mongoose.model('Product', prodSchema)