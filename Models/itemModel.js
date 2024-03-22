const mongoose = require('mongoose')
const Schema = mongoose.Schema

/* 
  This schema is the list of items or gifts. 
  The 'Wisher' property is for the people who want the gift item.
*/

const itemSchema = new Schema({
  
  name:{
    type: String,
    required: true
  },
  type:{
    type: String,
    required: false
  },
  cost: Number,
  wisher:{
    type: Schema.Types.ObjectId,
    ref: "Wisher", 
    required: true
  },
  receiver: String
})

module.exports = mongoose.model('Items', itemSchema)