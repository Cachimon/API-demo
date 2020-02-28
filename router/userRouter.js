const express = require('express')
//const mongdb = require('mongodb')
const UserModel = require('../mongooseModel/UserModel')
const router = express.Router()
const sendMail = require('../plugins/sendMail')
let code = {}
let codeSentTime = {}


/**
 * @api {Post} /user/login 用户登录
 * @apiGroup 用户管理
 *
 * @apiParam {String} username 用户名（邮箱）
 * @apiParam {String} password 用户密码
 * 
 * @apiParamExample {json} 参数示例
 * {
 *  "username": "eve@qq.com",
 *  "password": "111111"
 * }
 * 
 * @apiSuccessExample  {json} Response-Example
 * {
 *   "err": "0",
 *   "msg": "登录成功"
 *   "username": "eve@qq.com"
 * }
 */


router.post("/login", (request, response) => {
  let {username, password} = request.body
  if(!username || !password) return response.send({err: -1, msg: '参数错误'})
  UserModel.find({username, password}, (err, res) => {
    if(err || !res) return response.send({err: -2, msg: '查询失败'})
    response.send({err: 0, msg: '登录成功', username})
  })
})  


/**
 * @api {Post} /user/register 用户注册
 * @apiGroup 用户管理
 *
 * @apiParam {String} username 用户名（邮箱）
 * @apiParam {String} password 用户密码
 * @apiParam {String} codeInput 验证码
 * 
 * @apiParamExample {json} 参数示例
 * {
 *  "username": "eve@qq.com",
 *  "password": "111111",
 *  "codeInput": "1234"
 * }
 * 
 * @apiSuccessExample  {json} Response-Example
 * {
 *   "err": "0",
 *   "msg": "用户注册成功"
 *   "username": "eve@qq.com"
 * }
 */

router.post("/register", (request, response) => {
  let {username, password, codeInput} = request.body
  if(code[username]){
    let otime = codeSentTime[username]
    let ntime = Date.now()
    let diffTime = parseInt((ntime - otime)/1000)
    if(diffTime > 5 * 60){
      code[username] = ''
      codeSentTime[username] = ''
    }
  }
  if(!codeInput) return response.send({err: -1, msg:'请输入验证码'})
  if(!code[username]) return response.send({err: -2, msg: '请先获取验证码'})
  if(codeInput !== code[username]) return response.send({err: -3, msg: '验证码错误'})
  if(!username || !password) return response.send({err: -4, msg: '请输入用户名或者密码'})
  UserModel.find({username}).then(res => {
    if(res.length !== 0) return response.send({err: -5, msg: '用户名已存在'})
    let user = new UserModel({username, password})
    user.save(function(err, res){
      if(err) throw err
      console.log("创建用户：" + res.username)
      response.send({err: 0, msg: '用户注册成功', username})
    })
  }).catch(err => {
    console.log('用户注册产生错误：' + err)
  })

})


/**
 * @api {Post} /user/validate 发送注册验证码
 * @apiGroup 用户管理
 *
 * @apiParam {String} username 用户名（邮箱）
 * 
 * @apiParamExample {json} 参数示例
 * {
 *  "username": "eve@qq.com"
 * }
 * 
 * @apiSuccessExample  {json} Response-Example
 * {
 *   "err": "0",
 *   "msg": "验证码发送成功"
 * }
 */

router.post('/validate', (request, response) => {
  let {username} = request.body
  if(!username) return response.send({err: -1, msg: '参数错误'})
  UserModel.find({username}).then(res => {
    if(res.length !== 0) return response.send({err: -1, msg: '用户名已存在'})
    if(codeSentTime[username]){
      let otime = codeSentTime[username]
      let ntime = Date.now()
      let diffTime = parseInt((ntime - otime)/1000)
      if(diffTime < 5 * 60) return response.send({err: -2, msg: '五分钟后再发送请求'})
    }else{
      codeSentTime[username] = Date.now()
    }
    code[username] = (parseInt(Math.random()*10000) + "").padStart(4, '0')
    sendMail(username, code[username]).then(res => {
      //console.log(code[username] + '发送时间' + codeSentTime[username])
      response.send({err: 0, msg: '验证码发送成功'})
    }).catch(err => {
      console.log('发送邮箱验证码错误：' + err)
    })
  }).catch(err => {
    console.log('获取验证码发生错误：'+err)
  })
})

module.exports = router