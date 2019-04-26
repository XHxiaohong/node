const express = require('express');
const users= require('../../mongodb/user.js');
const EmailFun = require('../Email');

let router = express.Router();

router.get('/register', (require, res) =>{
  let data = require.query
  let username = data.username
  let password = data.password

  let obj = new users({ username, password })

  obj.save((error, docs)=> {
    if (error) {
      let obj = {
        msg: 'ERROR',
        txt: '注册账号失败,请重新注册!'
      }
      res.send(obj);
      console.log("setUser Error:" + error);
    } else {
      let obj = {
        msg: 'SUCCESS',
        txt: '注册账号成功,请登录!'
      }
      res.send(obj);
    }
  })
})

router.get('/login', (require, res) =>{
  let username = require.query.username
  let password = require.query.password
  
  users.find({username}, (err, docs) => {
    if (err)
      console.log('findError:%d', err)

    let obj = {
      msg: 'ERROR',
      txt: '当前用户不存在，请注册账号'
    }

    if (docs.length) {
      if (password == docs[0].password) {
        obj.msg = 'SUCCESS'
        res.send(obj)
      } else {
        obj.txt = '用户或密码错误，请重新输入！'
        res.send(obj)
      }
    } else {
      res.send(obj);
    }
  })
})

router.get('/seekPass', (require, res) =>{
  let username = require.query.username
  let Email = require.query.email
  
  users.find({username}, (err, docs) => {
    if (err)
      console.log('findError:%d', err)

    let obj = {
      msg: 'ERROR',
      txt: '当前用户不存在，请注册账号'
    }

    if (docs.length) {
      let email = docs[0].email
      let password = docs[0].password

      password `亲，你的用户密码是:${password}, 请妥善保管哟！`
      if (email) {
        EmailFun(email, password)
      } else if (Email) {
        EmailFun(Email, password)
      } else {
        obj.txt = '当前用户没有邮箱，请去注册面板输入用户名和邮箱'
        res.send(obj);
      }
    } else {
      res.send(obj);
    }
  })
})


module.exports = router