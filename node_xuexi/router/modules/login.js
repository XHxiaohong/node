// @ts-nocheck
const express = require('express');
const users= require('../../mongodb/user.js');

const Email = require('../../components/email.js');
const crypto = require('../../components/crypto.js');

let router = express.Router();

// 用户登录接口
router.post('/login', (require, response) => {
  let {username, password} = require.body;
  password = password.length >= 32 ? password : crypto.encrypt(password);

  users.find({username}, (err, docs) => {
    if (err) return console.log('findError:%d', err);

    let returnData = {
      msg: 'ERROR',
      text: '用户或密码错误！'
    }
    if (!docs.length) return response.send(returnData);
    if (password == docs[0].password) {
      returnData.msg = 'SUCCESS';
      returnData.text = '登录成功！';
    }
    return response.send(returnData);
  });
})

// 用户注册接口
router.post('/register', (require, response) => {
  let returnData = {
    msg: 'ERROR',
    text: '当前用户已存在，请重新注册账号'
  }
  let reg = /\S/;
  let {username, password, email} = require.body;

  for (let key in require.body) {
    if (!reg.test(require.body[key])) return returnData.text = key + '不得为空！';
  }

  users.find({username}, (err, docs) => {
    if (err) return console.log('findError:%d', err);

    if (docs.length) return response.send(returnData);
    let registerUser = new users({ username, password: crypto.encrypt(password), email });
    registerUser.save((error, docs)=> {
      if (error) {
        returnData.msg = 'ERROR',
        returnData.text = '注册账号失败,请重新注册!'
      } else {
        returnData.msg = 'SUCCESS'
        returnData.text = '注册账号成功,请登录!'
        returnData.username = username;
        returnData.password = password;
      }
      response.send(returnData);
    })
  });
})

// 找回密码 
router.post('/retrieve', (require, response) =>{
  let { username } = require.body;
  let returnData = {
    msg: 'ERROR',
    text: '当前用户不存在，请注册账号'
  }
  users.find({username}, (err, docs) => {
    if (err) return console.log('findError:%d', err);
    if (!docs.length) return response.send(returnData);

    let email = docs[0].email;
    if (email) {
      let password = crypto.decrypt(docs[0].password) || '';
      password = `亲，你的用户密码是:${password}, 请妥善保管哟！`;

      Email(email, password).then(()=> {
        returnData.msg = 'SUCCESS'
        returnData.text = '邮件已发送，请去邮箱查看！'
        response.send(returnData);
      }).catch(()=> {
        returnData.text = '邮件发送失败，可能是官方邮箱失效！'
        response.send(returnData);
      })
    } else {
      returnData.msg = 'ERROR'
      returnData.text = '没有找到用户邮箱！'
      response.send(returnData);
    }
  })
})

module.exports = router