const express = require('express')
//const mongdb = require('mongodb')
const GoodsModel = require('../mongooseModel/GoodsModel')
const router = express.Router()



/**
 * @api {Post} /goods/add 添加商品
 * @apiGroup 商品管理
 *
 * @apiParam {String} goods_name 商品名称
 * @apiParam {String} goods_price 商品单价
 * @apiParam {String} goods_number 商品数量
 * @apiParam {String} goods_introduce 商品介绍
 * @apiParam {Array} pics 商品图片
 * 
 * @apiParamExample {json} 请求数据
 * {
 *  "goods_name":"test_goods_name2",
 *  "goods_price":20,
 *  "goods_number":30,
 *  "goods_weight":40,
 *  "goods_introduce":"abc",
 *  "pics":[
 *    {"pic":"/tmp_uploads/30f08d52c551ecb447277eae232304b8"}
 *    ],
 * }
 * 
 * @apiSuccessExample  {json} 响应参数
 * {
 *  "err": "0",
 *  "msg": "成功添加商品",
 *  "result": {
 *    "_id": "5e5779bbb6a305183c510a0e"
 *    "goods_name":"test_goods_name2",
 *    "goods_price":20,
 *    "goods_number":30,
 *    "goods_weight":40,
 *    "goods_introduce":"abc",
 *    "pics":[
 *      {"pic":"/tmp_uploads/30f08d52c551ecb447277eae232304b8"}
 *      ],
 * }
 */
router.post("/add", (request, response) => {
  let { goods_name, goods_price, goods_number, goods_introduce, pics } = request.body
  if(!goods_name || !goods_price) return response.send({err: -1, msg: '参数错误'})
  GoodsModel.find({'goods_name': goods_name}).then(res => {
    if(res.length !== 0){
      return response.send({err: -1, msg: '商品名已存在'})
    }else{
      let goods = new GoodsModel({goods_name, goods_price, goods_number, goods_introduce, pics})
      return goods.save()
    }
  }).then(res => {
    if(!res._id) throw new Error('商品名已存在')
    console.log("添加商品" + JSON.stringify(res))
    response.send({err: 0, msg: '成功添加商品', result: res})
  }).catch(err => {
    console.log(err)
  })
})  



/**
 * @api {Get} /goods/delete 删除商品
 * @apiGroup 商品管理
 *
 * @apiParam {String} _id 商品id
 * 
 * @apiParamExample {json} 请求数据
 * {
 *  "_id": "5e5779bbb6a305183c510a0e"
 * }
 * 
 * @apiSuccessExample  {json} 响应参数
 * {
 *  "err": "0",
 *  "msg": "成功删除商品",
 *  "result": {
 *    "_id": "5e5779bbb6a305183c510a0e"
 *    "goods_name":"test_goods_name2",
 *    "goods_price":20,
 *    "goods_number":30,
 *    "goods_weight":40,
 *    "goods_introduce":"abc",
 *    "pics":[
 *      {"pic":"/tmp_uploads/30f08d52c551ecb447277eae232304b8"}
 *      ],
 * }
 */
router.get("/delete",(request, response) => {
  let {_id} = request.query
  if(!_id) return response.send({err: -1, msg: '参数错误'})
  GoodsModel.findByIdAndRemove(_id, function(err, res){
    if(err || !res) return response.send({err: -1, msg: '找不到该商品，删除失败'})
    console.log("删除商品：" + JSON.stringify(res))
    response.send({err: 0, msg: '删除成功', result: res})
  })
})



/**
 * @api {Get} /goods/search 查询商品
 * @apiGroup 商品管理
 *
 * @apiParam {String} query 查询关键字
 * @apiParam {String} pagenum 页码
 * @apiParam {String} pagesize 一页展示的数据数
 * 
 * @apiParamExample {json} 请求数据
 * {
 *  "query": "音箱",
 *  "pagenum": "1",
 *  "pagesize": "10"
 * }
 * 
 * @apiSuccessExample  {json} 响应参数
 * {
 *  "err": "0",
 *  "msg": "查询成功",
 *  "result": [{
 *    "_id": "5e5779bbb6a305183c510a0e"
 *    "goods_name":"音箱1",
 *    "goods_price":20,
 *    "goods_number":30,
 *    "goods_weight":40,
 *    "goods_introduce":"abc",
 *    "pics":[
 *      {"pic":"/tmp_uploads/30f08d52c551ecb447277eae232304b8"}
 *      ]
 *    },
 *    {
 *    "_id": "5e5779bbb6a305183c510a0e"
 *    "goods_name":"音箱2",
 *    "goods_price":20,
 *    "goods_number":30,
 *    "goods_weight":40,
 *    "goods_introduce":"abc",
 *    "pics":[
 *      {"pic":"/tmp_uploads/30f08d52c551ecb447277eae232304b8"}
 *      ]
 *    }]
 */
router.get("/search", (request, response) => {
  let{query, pagenum, pagesize} = request.query
  if(!pagenum || !pagesize) return response.send({err: -1, msg: '参数错误'})
  let limitNum = parseInt(pagesize)
  let skipNum = (pagenum - 1) * limitNum
  GoodsModel.find({goods_name: {$regex: query}}).sort({_id: 1}).skip(skipNum).limit(limitNum).exec(function(err, res){
    if(err) throw err
    if(res.length === 0) return response.send({err: -1, msg: '查询失败'})
    console.log("查找" + query)
    response.send({err: 0, msg: '查询成功', result: res})
  })
})



/**
 * @api {Post} /goods/update 修改商品
 * @apiGroup 商品管理
 *
 * @apiParam {String} _id 商品id
 * 
 * @apiParamExample {json} 请求数据
 * {
 *  "_id": "5e5779bbb6a305183c510a0e"
 * }
 * 
 * @apiSuccessExample  {json} 响应参数
 * {
 *  "err": "0",
 *  "msg": "成功修改商品",
 *  "result": {
 *    "_id": "5e5779bbb6a305183c510a0e"
 *    "goods_name":"test_goods_name2",
 *    "goods_price":20,
 *    "goods_number":30,
 *    "goods_weight":40,
 *    "goods_introduce":"abc",
 *    "pics":[
 *      {"pic":"/tmp_uploads/30f08d52c551ecb447277eae232304b8"}
 *      ],
 * }
 */
router.post("/update",(reqest, response) => {
  let { _id, goods_name, goods_price, goods_number, goods_introduce, pics } = reqest.body
  if(!_id) return response.send({err: -1, msg: '参数错误'})
  GoodsModel.findByIdAndUpdate(_id, {goods_name, goods_price, goods_number, goods_introduce, pics}, function(err, res){
    if(err) return console.log(err)
    if(!res) return response.send({err: -1, msg: '找不到该商品'})
    response.send({err: 0, msg: '更新成功', result: res})
  })
})

module.exports = router