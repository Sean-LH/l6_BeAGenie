const express = require ('express')
const wishersRouter = express.Router()
const wisherList = require('../Models/wishersModel')


// Get all the wishers 
wishersRouter.get('/', async(req, res, next)=>{
  try{
    const result = await wisherList.find({userId: req.auth._id})
    return res.status(200).send(result)
  }catch(error){
    res.status(500)
    return next(error)
  }
})

wishersRouter.post("/", async (req, res, next)=>{
  try {
    req.body.userId = req.auth._id
    const newName = new wisherList(req.body)
    const savedName = await newName.save()
    return res.status(201).send(savedName)
  } catch (error) {
    res.status(500)
    return next(error)
  }
  })
  
  wishersRouter.delete("/:wisherId", async (req, res, next)=>{
    try {
      const nameId = req.params.wisherId
      const person = await wisherList.findOneAndDelete({_id:req.params.wisherId, userId: req.auth._id})
      return res.status(201).send(`${person.name} is removed`)
    }catch (error) {
      res.status(500)
      return next(error)
    }
  })

  wishersRouter.put('/:wisherId', async(req, res, next)=>{
    try {
      const wisherId = req.params.wisherId
      const wInfo = await wisherList.findOneAndUpdate({_id: wisherId, userId: req.auth._id}, req.body, {new: true})
      return res.status(201).send(wInfo)
    } catch(error){
      res.status(500)
      return next(error)
    }
  })

module.exports = wishersRouter