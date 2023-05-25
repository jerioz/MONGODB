const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config/keys')
const bcrypt = require('bcryptjs')

const UserController = {
    async newUser(req, res) {
        try {
         const password = bcrypt.hashSync(req.body.password, 10) 
         const user = await User.create({...req.body, password: password})
        //  if(!req.body.name || !req.body.email || !req.body.password || !req.body.age) {
        //   return res.send({message: 'Rellene todos los campos'})
        //  }
         res.status(201).send({ message: 'user created', user}) 
        } catch (error) {
          console.error(error) 
          res.status(500).send({message: 'user not created'})
        }
    },
    async login(req, res) {
       try {
        const user = await User.findOne({
            email: req.body.email,
            // password: req.body.password
        })
        if(!user) {
          return res.status(400).send({message: 'email or password incorrect'})
        }
        const isMatch = bcrypt.compareSync(req.body.password, user.password )
        if(!isMatch) {
          return res.status(400).send({message: 'email or password incorrect'})
        }
        const token = jwt.sign({_id: user._id, password: user.password}, jwt_secret) 
        if(user.tokens.legth > 4) user.tokens.shift()
        user.tokens.push(token)
        await user.save()
        res.send({ message: 'Welcome ' + user.name, token, user})
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
    },
    async getUsersLogin(req, res) {
      try {
        const usersLogin = req.user._id
        const users = await User.find(usersLogin)
        if(!users) {
          return res.status(404).send({message: 'usuario no encontrado'})
        }
        res.send(users)
      } catch (error) {
        console.error(error)
      }
    }
}

module.exports = UserController