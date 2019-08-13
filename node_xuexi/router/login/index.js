// @ts-nocheck
const express = require('express');
const Crypto = require('crypto');
const users= require('../../mongodb/user.js');
const EmailFun = require('../Email');

let router = express.Router();

router.post('/register', (require, res) =>{
  // let data = require.query
  let username = require.body.username
  let password = require.body.password
  let email = require.body.email

  users.find({username}, (err, docs) => {
    if (err) console.log('findError:%d', err)

    let returnData = {
      msg: 'ERROR',
      txt: '当前用户名已存在！'
    }
    if (docs.length) {
      res.send(returnData)
    } else {
      let registerUser = new users({ username, password, email })
      registerUser.save((error, docs)=> {
        if (error) {
          returnData.txt = '注册账号失败,请重新注册!'
          console.log('reginter user ERROR: ', error)
        } else {
          returnData.msg = 'SUCCESS'
          returnData.txt = '注册账号成功,请登录!'
          console.log('reginter user SUCCESS: ', docs)
        }
        res.send(returnData);
      })
    }
  })
})

router.post('/login', (require, res) =>{
  let username = require.body.username
  let password = require.body.password
  
  users.find({username}, (err, docs) => {
    if (err) console.log('findError:%d', err)

    let returnData = {
      msg: 'ERROR',
      txt: '当前用户不存在，请注册账号'
    }

    console.log(docs)
    if (docs.length) {
      if (password == docs[0].password) {
        returnData.msg = 'SUCCESS'
        returnData.txt = '用户登录成功！'
      } else {
        returnData.txt = '用户或密码错误，请重新输入！'
      }
    }
    res.send(returnData);
  })
})


// 解密
const CryptoJS = require('crypto-js');
function decrypt(word, keyStr) {
  const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
  const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量

  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  let str = decryptedStr.toString();

  return str;
}


router.get('/seekPass', (require, res) =>{
  let username = require.query.username
  
  users.find({username}, (err, docs) => {
    if (err) console.log('findError:%d', err)
    let returnData = {
      msg: 'ERROR',
      txt: '当前用户不存在，请注册账号'
    }

    if (docs.length) {

      let email, password
      for (let key of docs) {
        if (key.email) {
          email = key.email
          password = decrypt(key.password)
          break;
        } else {
          users.deleteOne(key, function(err, obj) {
            console.log(err)
            console.log(obj)
          })
        }
      }
      password = `亲，你的用户密码是:${password}, 请妥善保管哟！`

      if (email) {
        EmailFun(email, password)
        returnData.msg = 'SUCCESS'
        returnData.txt = '邮件已发送，请查收'
      } else {
        returnData.txt = '没有找到用户邮箱！'
      }
    }
    res.send(returnData);
  })
})


module.exports = router