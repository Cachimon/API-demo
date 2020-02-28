const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/newone', {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.on('connected', function(){
  console.log("connected db")
})
mongoose.connection.on('error', function(err){
  console.log(err)
})
mongoose.connection.on('disconnected', function(){
  console.log("disconnected db")
})

const Schema = mongoose.Schema
let userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model("userModel", userSchema)
