const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
const User = require("../models/User")


const login = async (req, res) => {
    const { userName, password } = req.body
    if (!userName || !password)
        return res.status(400).json({ message: 'All fields are required' })
    const findUser = await User.findOne({ userName }).lean()
    if (!findUser || !findUser.active)
        return res.status(400).json({ message: 'Unauthorized' })
    console.log(findUser.password)
    const match = await bcrypt.compare(password, findUser.password)
    if (!match) return res.status(400).json({ message: 'Unauthorized' })
    // res.send("logged in!")
    const userInfo= {_id:findUser._id,name:findUser.name,
                     role:findUser.role, userName:findUser.userName,
                    email:findUser.email}
    const accessToken = jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
    // console.log(userInfo);
    res.json({accessToken:accessToken})
    console.log({accessToken:accessToken});
    

}
const register = async (req, res) => {
    const { userName, password, name, email, phone } = req.body
    if (!name || !userName || !password || !email) // Confirm data
        return res.status(400).json({ message: 'All fields are required' })
    const duplicate = await User.findOne({userName}).lean()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate username" })
    }
    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject = { userName, password: hashedPwd, name, email, phone }
    const user = await User.create(userObject)
    console.log(user);
    if (user) { // Created
        return res.status(201).json({
            message: `New user ${user.userName} created` })
    } else {
        return res.status(400).json({ message: 'Invalid user received' })
    }
}

module.exports = { login, register }