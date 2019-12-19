
const fs = require('fs');
const path = require('path');
const express = require('express');

let router = express.Router();


let filePathArr = [];
let filePath = path.join(__dirname, '');

function getFilePath(_path) {
  let listFile = fs.readdirSync(_path);
  let reg = 'router'
  listFile.forEach(function (filename) {
    let filedir = path.join(_path, filename);
    let stat = fs.lstatSync(filedir);
    let isDir = stat.isDirectory()
    // console.log(filedir)
    if (isDir) {
      getFilePath(filedir);
    } else {
      var str = filedir.substr(filedir.indexOf(reg), filedir.length);
      str = str.replace(/router\\/, './');
      str = str.replace(/\\/, '/');
      if (str !== './index.js') {
        filePathArr.push(str)
      }
    }
  })
}
getFilePath(filePath);



// router.get('/', (require, res) =>{
//   res.render('index', { title: 'Express' });
// })

router.use(require('./login'));
// 导出路由对象
module.exports = router