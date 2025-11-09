const mongoose = require("mongoose")
const cart = require("./Cart")
const userSchema = new mongoose.Schema({
   userName:{
   type:String,
      required:true,
      unique:true
   },   
   password:{
      type:String,
      required:true
   },
   name:{
      type:String,
      required:true
   },
   email:{
      type:String,
      required:true
   },
   phone:{
      type:String
   },
   role:{
   type:String,
   enum:['User', 'Admin'],
   default:"User",
   },
   active: {
   type: Boolean,
   default: true,
   },
   cart:{
      type: [cart],
      default: []
   }
},{timestamps: true})
module.exports = mongoose.model('User', userSchema)