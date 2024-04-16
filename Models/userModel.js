const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password:{
    type: String,
    required: true
  },
  
  isAdmin: {
    type: Boolean,
    default: false
  },
  // name:{
  //   type: String,
  //   required: true
  // }
})


userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
      return next();
  } catch (error) {
      return next(error);
  }
});

// Checking and comparing the password
userSchema.methods.checkPassword = async function(passwordAttempt) {
  try {
      const isMatch = await bcrypt.compare(passwordAttempt, this.password);
      return isMatch;
  } catch (error) {
      throw error;
  }
};

// method to remove users password for token and sending the response

userSchema.methods.withoutPassword = function(){
  const user = this.toObject()
  delete user.password
  return user
}// Once this is built, it needs to be added to the authRouter file


module.exports = mongoose.model('Users', userSchema)