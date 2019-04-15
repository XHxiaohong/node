const express = require('express');
let router = express.Router();

// router.get('/', (require, res) =>{
//   res.render('index', { title: 'Express' });
// })

router.use(require('./login'));
// 导出路由对象
module.exports = router