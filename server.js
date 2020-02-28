"use strict";
const express = require('express')
const app = express()
const port = 3000
const userRouter = require('./router/userRouter')
const goodsRouter = require('./router/goodsRouter')
const router = null
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({
  extended: true
})) // for parsing application/x-www-form-urlencoded
app.use("/user", userRouter)
app.use("/goods", goodsRouter)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
