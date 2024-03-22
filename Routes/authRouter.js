const express = require('express')
const authRouter = express.Router()
const UserList = require('../Models/userModel')
const jwt = require("jsonwebtoken")
require('dotenv').config()


// getting all users
authRouter.get('/get', async(req, res, next)=>{
  try {
    const result = await UserList.find()
    return res.status(200).send(result)
  } catch (error) {
    res.status(500)
    return next(error)
  }
})
//sign Up

authRouter.post("/signup", async(req, res, next)=>{
  try{
      const existingUser = await UserList.findOne({username:req.body.username.toLowerCase()})
      if (existingUser){
        res.status(403)
        return next(new Error("This username is already taken")) 
      }
      const newUser = new UserList(req.body)
      const savedUser = await newUser.save()

      //    --    --    token's payload w/ SECRET
      const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
      return res.status(201).send({token, user: savedUser.withoutPassword()})
      
    }catch(err){
      res.status(500)
      return next(err)
    }
  })

  // Login

authRouter.post("/login", async(req, res, next)=>{
  try {
    const existingUser = await UserList.findOne({username: req.body.username.toLowerCase()})

    if(!existingUser){
      res.status(403)
      return next(new Error('Username or Password incorrect'))
    }

    const passwordCheck = await existingUser.checkPassword(req.body.password)

    if(!passwordCheck){
      res.status(403)
      return next(new Error('Username or Password incorrect'))
    }

    const token = jwt.sign(existingUser.withoutPassword(), process.env.SECRET)
    return res.status(201).send({token, user: existingUser.withoutPassword()})
  } catch(err) {
    res.status(500)
    return next(err)
  }
})


module.exports = authRouter
