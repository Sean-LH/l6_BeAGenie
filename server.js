const express = require('express')

const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

require('dotenv').config()
const {expressjwt: jwt} = require('express-jwt')

const authRouter = require('./Routes/authRouter')
const wishersRouter = require('./Routes/wishersRouter')
const itemRouter = require('./Routes/itemRouter')

const path = require("path")


//  Middleware

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "Client", "dist")))

mongoose.connect('mongodb+srv://slhorace01:pqH7GaEV2ScHFdLT@wishcluster.cnoudmp.mongodb.net/?retryWrites=true&w=majority&appName=wishCluster')
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
.then(()=>{
  console.log('Connected to the DB')
})
.catch((err)=> {
  console.log(err)
})

// Endpoints 

app.use('/api/auth', authRouter)
app.use('/api/main', jwt({secret: process.env.SECRET, algorithms:['HS256']}))
app.use('/api/main/wishers', wishersRouter)
app.use('/api/main/items', itemRouter)


//      Error Handler
app.use( (err, req, res, next) =>{
  console.log('here',err)
  if(err.name === 'UnauthorizedError'){
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Client", "dist", "index.html"));
});

app.listen(9000,()=>{console.log("Active on port 9000")})


/*
username: slhorace01
password:pqH7GaEV2ScHFdLT
*/

/** User 1
  "username": "test1",
    "password": "working",
    "name": "JJ"

    USER 2
    {
    "username": "test12",
    "password": "working",
    "name": "JJ"
}
 */