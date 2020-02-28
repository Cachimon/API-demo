<<<<<<< HEAD
# API-demo
=======
### 1. 后台管理API ###

#### 用户登录注册及商品的增删改查

​     

### 1.1 用户管理

#### 1.1.1 发送注册验证码

post

```html
/user/validate
```

参数

| 字段     | 类型   | 描述           |
| -------- | ------ | -------------- |
| username | String | 用户名（邮箱） |

- 请求数据     

```json
{
    "username": "eve@qq.com"
}
```

- 响应参数   

```json
{
    "err": "0",
    "msg": "验证码发送成功"
}
```

#### 1.1.2 用户注册  

post

```html
/user/register
```

参数

| 字段      | 类型   | 描述           |
| --------- | ------ | -------------- |
| username  | String | 用户名（邮箱） |
| password  | String | 用户密码       |
| codeInput | String | 验证码         |

- 请求数据

```json
{
    "username": "eve@qq.com",
    "password": "111111",
    "codeInput": "1234"
}
```

- 响应参数

```json
{
  "err": "0",
  "msg": "用户注册成功"
  "username": "eve@qq.com"
}
```

#### 1.1.3 用户登录

post

```html
/user/login
```

参数

| 字段     | 类型   | 描述           |
| -------- | ------ | -------------- |
| username | String | 用户名（邮箱） |
| password | String | 用户密码       |

- 请求数据

```json
{
    "username": "eve@qq.com",
    "password": "111111"
}
```

- 响应数据

```json
{
  "err": "0",
  "msg": "登录成功"
  "username": "eve@qq.com"
}
```



### 1.2 商品管理

#### 1.2.1 修改商品

post

```html
/goods/update
```

参数

| 字段 | 类型   | 描述   |
| ---- | ------ | ------ |
| _id  | String | 商品id |

- 请求数据

```json
{
    "_id": "5e5779bbb6a305183c510a0e"
}
```

- 响应参数

```json
{
 "err": "0",
 "msg": "成功修改商品",
 "result": {
   "_id": "5e5779bbb6a305183c510a0e"
   "goods_name":"test_goods_name2",
   "goods_price":20,
   "goods_number":30,
   "goods_weight":40,
   "goods_introduce":"abc",
   "pics":[
     {"pic":"/tmp_uploads/30f08d52c551ecb447277eae232304b8"}
     ],
}
```



#### 1.2.2 删除商品

get

```html
/goods/delete
```

参数

| 字段 | 类型   | 描述   |
| ---- | ------ | ------ |
| _id  | String | 商品id |

- 请求数据

```json
{
    "_id": "5e5779bbb6a305183c510a0e"
}
```

- 响应参数

```json
{
 "err": "0",
 "msg": "成功删除商品",
 "result": {
   "_id": "5e5779bbb6a305183c510a0e"
   "goods_name":"test_goods_name2",
   "goods_price":20,
   "goods_number":30,
   "goods_weight":40,
   "goods_introduce":"abc",
   "pics":[
     {"pic":"/tmp_uploads/30f08d52c551ecb447277eae232304b8"}
     ],
}
```



#### 1.2.3 查询商品

get

```html
/goods/search
```

参数

| 字段     | 类型   | 描述             |
| -------- | ------ | ---------------- |
| query    | String | 查询关键字       |
| pagenum  | String | 页码             |
| pagesize | String | 一页展示的数据数 |

- 请求数据

```json
{
    "query": "音箱",
    "pagenum": "1",
    "pagesize": "10"
}
```

- 响应参数

```json
{
 "err": "0",
 "msg": "查询成功",
 "result": [{
   "_id": "5e5779bbb6a305183c510a0e"
   "goods_name":"音箱1",
   "goods_price":20,
   "goods_number":30,
   "goods_weight":40,
   "goods_introduce":"abc",
   "pics":[
     {"pic":"/tmp_uploads/30f08d52c551ecb447277eae232304b8"}
     ]
   },
   {
   "_id": "5e5779bbb6a305183c510a0e"
   "goods_name":"音箱2",
   "goods_price":20,
   "goods_number":30,
   "goods_weight":40,
   "goods_introduce":"abc",
   "pics":[
     {"pic":"/tmp_uploads/30f08d52c551ecb447277eae232304b8"}
     ]
   }]
```



#### 1.2.4 添加商品       

post

```html
/goods/add
```

参数

| 字段            | 类型   | 描述     |
| --------------- | ------ | -------- |
| goods_name      | String | 商品名称 |
| goods_price     | String | 商品单价 |
| goods_number    | String | 商品数量 |
| goods_introduce | String | 商品介绍 |
| pics            | Array  | 商品图片 |

- 请求数据

```json
{
 "goods_name":"test_goods_name2",
 "goods_price":20,
 "goods_number":30,
 "goods_weight":40,
 "goods_introduce":"abc",
 "pics":[
   {"pic":"/tmp_uploads/30f08d52c551ecb447277eae232304b8"}
   ],
}
```

- 响应参数

```json
{
 "err": "0",
 "msg": "成功添加商品",
 "result": {
   "_id": "5e5779bbb6a305183c510a0e"
   "goods_name":"test_goods_name2",
   "goods_price":20,
   "goods_number":30,
   "goods_weight":40,
   "goods_introduce":"abc",
   "pics":[
     {"pic":"/tmp_uploads/30f08d52c551ecb447277eae232304b8"}
     ],
}
```

>>>>>>> upload
