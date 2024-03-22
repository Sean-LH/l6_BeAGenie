const express = require('express')
const itemRouter = express.Router()
const itemList = require('../Models/itemModel')
const wishersModel = require('../Models/wishersModel')

itemRouter.get("/", async (req, res, next) =>{
  try {
    const result = await itemList.find()
    return res.status(201).send(result)
  }catch (error) {
    res.status(500)
    return next(error)
  }
})
// This should get item based on the wisher's Id - success
itemRouter.get("/:Id", async (req, res, next) =>{
  try {
    const result = await itemList.find({wisher:req.params.nameId})
    return res.status(201).send(result)
  }catch (error) {
    res.status(500)
    return next(error)
  }
})

itemRouter.post("/:wisherId", async (req, res, next)=>{ //success
  try {
    const wisher = await wishersModel.findOne({_id:req.params.wisherId})
    req.body.receiver = wisher.name
    console.log(wisher)
    req.body.wisher = req.params.wisherId
    const newitem = new itemList(req.body)
    const saveditem = await newitem.save()
    return res.status(201).send(saveditem)
  } catch (error) {
    res.status(500)
    return next(error)
  }
  })

  itemRouter.delete("/:itemId", async (req, res, next)=>{ //success
    try {
      const itemId = req.params.itemId
      // console.log('itemId',itemId)
      const item = await itemList.findOneAndDelete({_id:itemId})
      // console.log('item', item)
      return res.status(201).send(`${item.name} is removed`)
    }catch (error) {
      res.status(500)
      return next(error)
    }
  })

  itemRouter.put('/:itemId', async(req, res, next)=>{ //  success
    try {
      const itemId = req.params.itemId
      const itemInfo = await itemList.findOneAndUpdate({_id: itemId}, req.body, {new: true})
      return res.status(201).send(itemInfo)
    } catch(error){
      res.status(500)
      return next(error)
    }
  })

module.exports = itemRouter