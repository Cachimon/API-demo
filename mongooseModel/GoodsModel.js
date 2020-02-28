const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/newone', {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.on('connected', function(){
  console.log("connected goods db")
})
mongoose.connection.on('error', function(err){
  console.log(err)
})
mongoose.connection.on('disconnected', function(){
  console.log("disconnected goods db")
})

const Schema = mongoose.Schema
//goods_name, goods_price, goods_number, goods_introduce, pics
let goodsSchema = new Schema({
  goods_name: {
    type: String,
    unique: true,
    required: true
  },
  goods_price: {
    type: String,
    required: true
  },
  goods_number: {
    type: String,
    default: '0'
  },
  goods_introduce: {
    type: String,
  },
  pics: {
    type: Array,
    //required: true
  },
})
module.exports = mongoose.model("goodsModel", goodsSchema)
// let user = new userModel({username: 'tom', password: '2222'})
// user.save((err, res) => {
//   if(err) throw err
//   console.log(res)
// })
