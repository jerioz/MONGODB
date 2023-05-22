const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config/keys')

const UserController = {
    async newUser(req, res) {
        try {
         const user = await User.create(req.body)
         res.status(201).send({ message: 'user created', user}) 
        } catch (error) {
          console.error(error)  
        }
    },
    async login(req, res) {
       try {
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password
        })
        const token = jwt.sign({_id: user._id, password: user.password}, jwt_secret) 
        if(user.tokens.legth > 4) user.tokens.shift()
        user.tokens.push(token)
        await user.save()
        res.send({ message: 'Welcome' + user.name, token})
       } catch (error) {
        console.error(error)
       }
    },
    async logout(req, res) {
        try {
          await User.findByIdAndUpdate(req.user._id, {
            $pull: {tokens: req.headers.authorization}
          })
          res.send({message: 'disconnected succesfully'})
        } catch (error) {
          res.status(500).send({message: 'There is a problem with logout'}) 
        }
    }
}

module.exports = UserController