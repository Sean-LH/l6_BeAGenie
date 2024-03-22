const mongoose = require('mongoose')
const Schema = mongoose.Schema

//wisher refers to the person the user is buying a gift for

const wisherSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  occasion: {
    type: String,
    required: false,
  },

  needBy:{
    type: Date,
    required: false
  },

  userId:{
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }
})
//The basic format for dates is YYYY-MM-DD
module.exports = mongoose.model('Wisher', wisherSchema)