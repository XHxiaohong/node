// @ts-nocheck
const express = require('express');
const users = require('../../mongodb/user.js');
const crypto = require('../../components/crypto.js');

let router = express.Router();

// require, response
router.get('/user/list', (require, response) => {
  let username = require.query.username;
  let returnData = { msg: 'error', data: '没有该用户！' }

  users.find({ username }, (err, docs) => {
    if (err) {
      response.send(returnData)
      console.log('findError:%d', err);
      return false
    }

    if (!docs.length) return response.send(returnData);

    returnData.data = {}
    returnData.msg = 'success'
    let keys = ['name', 'username', 'email', 'date', 'gender', 'telephone', 'imgUrl', 'role', 'address', 'autograph']
    keys.map(key=> {
      returnData.data[key] = docs[0][key]
    })
    response.send(returnData);
  })
})


router.post('/user/telephone', (require, respone)=> {
  let {username, telephone} = require.body;
  users.updateOne({username}, {telephone}, (err, docs)=> {
    if (err) return console.log(err)
    
    console.log(docs)

    respone.send({msg: 'success', data: '绑定手机成功！'})
  })
});


module.exports = router;