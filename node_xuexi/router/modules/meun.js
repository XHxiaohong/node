const express = require('express');
const meuns = require('../../mongodb/meun.js');

let router = express.Router();

// 获取菜单数据
router.post('/meun/list', (require, response)=> {
  let {page, size, meunName} = require.body;
  let condition = meunName ? {$or:[{meunName: meunName}]} : {}

  /*
   * skip 跳过的条数
   * limit 获取数据的条数
  */
  console.log('获取菜单数据')
  meuns.countDocuments(condition, (err, count)=> {
    if (err)  return response.send({msg: 'ERROR', err})
    

    if (!count) {
      return response.send({msg: 'SECCUSS', data: [], length: count})
    }

    size = parseInt(size);
    page = (parseInt(page) - 1) * size; 
    
    meuns.find(condition).skip(page).limit(size).exec(function (err, docs) {
      if (err)  return response.send({msg: 'ERROR', err})
      response.send({msg: 'SECCUSS', data: docs, length: count})
    });
  });
})

// 添加菜单接口
router.post('/meun/add', (require, response)=> {
  let {meunName, fatherID, meunPath, meunIcon} = require.body;


  console.log('添加菜单数据')
  meuns.find({meunName}, (err, docs)=> {
    if (docs.length) {
      return response.send({msg: 'ERROR', text: '该菜单已存在！'})
    }

    let saveMeun = new meuns({
      meunName, 
      fatherID,
      meunPath,
      meunIcon 
    });


    console.log('添加菜单数据')
    let returnData = {}
    saveMeun.save((err, docs)=> {
      if (err) {
        returnData.msg = 'ERROR',
        returnData.text = '新增菜单失败！'
      } else {
        returnData.msg = 'SUCCESS'
        returnData.text = '新增菜单成功！'

        // console.log(docs)
        // @ts-ignore
        meuns.addMeunID(docs._id, function(err, blog) {
          console.log(blog, err)
        })
        meuns.addNumber(docs._id, function(err, blog) {
          console.log(blog, err)
        })
      }
      response.send(returnData);
    })
  })
})

// 修改菜单数据
router.post('/meun/update', (require, response)=> {
  let {id, meunName, fatherID, meunPath, meunIcon} = require.body;
  let data = {
    meunName, 
    fatherID,
    meunPath, 
    meunIcon
  }

  meuns.findByIdAndUpdate(id, {$set: data}).then(res=> {
    console.log(res)
    response.send({msg: 'ERROR', text: '修改菜单'})
    // if (res) {

    // } else {

    // }
  })

})


// 删除菜单数据
router.post('/meun/remove', (require, response)=> {
  const id = require.body.id;
  meuns.deleteOne({_id: id}, (err, docs)=> {
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
meuns.remove({}, (err, docs)=> {
  console.log(err, docs)
})

module.exports = router