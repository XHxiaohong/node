const express = require('express');
const meuns = require('../../mongodb/meun.js');

let router = express.Router();

// 获取菜单数据
router.post('/meun/list', (require, response)=> {
  let {page, size, meunName} = require.body;
  let condition = meunName ? {$or:[{meunName: meunName}]} : {}

  page -= 1
  meuns.find(condition).skip(page).limit(size).exec(function (err, docs) {
    if (err) {
      console.log(err)
      response.send({msg: 'ERROR', err})
    }

    response.send({msg: 'SECCUSS', data: docs })
  })
})


// 删除菜单数据
router.post('/meun/add', (require, response)=> {
  const id = require.body.id;
  meuns.remove({id: id}, (err, docs)=> {
    if (err) {
      console.log(err)
      response.send({msg: 'ERROR', err})
    }
    console.log(docs)
  })
})

router.post('/meun/remove', (require, response)=> {
  const id = require.body.id;
  meuns.remove({_id: id}, (err, docs)=> {
    if (err) {
      console.log(err)
      response.send({msg: 'ERROR', err})
    }
    console.log(docs)
  })
})

/*
 * 删除数据
 * users.remove({email:'1771872709@qq.com'}, (err, docs)=> {
 *  console.log(err, docs)
 * })
*/

module.exports = router