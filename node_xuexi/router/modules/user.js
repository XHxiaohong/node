// @ts-nocheck
const fs = require('fs');
const express = require('express');
const users = require('../../mongodb/user.js');
const crypto = require('../../components/crypto.js');
var formidable = require('formidable');

let router = express.Router();

// 获取用户信息
router.get('/user/list', (require, response) => {
  let username = require.query.username || null;
  let returnData = { msg: 'error', data: '获取用户信息失败！' };

  let need = {
    name: 1,
    username: 1,
    email: 1,
    date: 1,
    gender: 1,
    telephone: 1,
    imgUrl: 1,
    role: 1,
    address: 1,
    autograph: 1
  }
  let find = username ? { username } : {};

  users.find(find, need, (err, docs) => {
    if (err) {
      console.log('findError:%d', err);
      return response.send(returnData)
    }
    // console.log(docs)
    if (!docs.length) return response.send(returnData);

    returnData.msg = 'success';
    returnData.data = docs;
    response.send(returnData);
  })
})

// 绑定手机
router.post('/user/telephone', (require, respone) => {
  let { username, telephone } = require.body;
  users.updateOne({ username }, { telephone }, (err, docs) => {
    if (err) return console.log(err)
    respone.send({ msg: 'success', data: '绑定手机成功！' })
  })
});

// 绑定邮箱
router.post('/user/email', (require, respone) => {
  let { username, email } = require.body;
  users.updateOne({ username }, { email }, (err, docs) => {
    if (err) return console.log(err)
    respone.send({ msg: 'success', data: '绑定邮箱成功！' })
  })
});

// 保存用户信息 
router.post('/user/update', (require, respone) => {
  // let { ...update } = require.body;
  let { ...update } = require.query

  let id = '5dfb39d645e19c2b147bb02e';
  // console.log(update)
  users.updateOne({ _id: id }, { gender: '男' }, (err, docs) => {
    if (err) return console.log(err)

    // console.log(docs)
    respone.send({ msg: 'success', data: '保存个人信息成功！' })
  })
});


// 修改用户密码
router.post('/user/update', (require, respone) => {
  // let { ...update } = require.body;
  let { id, password } = require.query

  users.find({ _id: id }, { password: 1 }, (err, dosc)=> {
    if (err) {
      return console.log(err)
    }

    console.log(dosc)
    const pass = crypto.decrypt(dosc[0].passeord)
    console.log(pass)
  })
  

  // users.updateOne({ _id: id }, { gender: '男' }, (err, docs) => {
  //   if (err) return console.log(err)

  //   console.log(docs)
  //   respone.send({ msg: 'success', data: '保存个人信息成功！' })
  // })
});



// 接收上传文件数据
// router.use(express.static('upload'));

// 判断是否是文件上传
function isFormData (res) {
  let type = res.headers['content-type'] || '';
  return type.includes('multipart/form-data');
}

// 修改头像 /user/uploadImg
router.post('/user/uploadImg', (require, respone)=> {
  if (!isFormData(require)) {
    respone.statusCode = 400;
    respone.end('错误的请求, 请用multipart/form-data格式上传数据！')
  }  

  console.log('*************************文件上传*************************');

  var form = new formidable.IncomingForm();
  form.uploadDir = './public/userImg';

  form.parse(require, function(err, fields, files) {
    if  (err) return console.log(err);

    if (!files.file.type.includes('image')) {
      respone.statusCode = 400;
      return respone.end('上传数据错误，请上传图片数据！');
    } else {
      let tmie = new Date().getTime()
      let suffix = files.file.name.split('.').pop();
      let imgName = fields.username + '_' + tmie + '.' + suffix;
      let imgPath = '/public/userImg/' + imgName;

      console.log(files.file.name)
      console.log(imgPath)
      fs.renameSync(files.file.path, '.' + imgPath);

      respone.send({msg: 'success', text: '修改图像成功！', url: imgPath});
      users.updateOne({ username: fields.username }, { imgUrl: imgPath }, (err, docs) => {
        if (err) return console.log(err)
      })
    }
  });
})

module.exports = router;