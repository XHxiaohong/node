// @ts-nocheck
const ip = require('ip');
const cors = require('cors');
const path = require('path');
const express = require('express');
const process = require('process');
const bodyParser = require('body-parser');

const router = require('./router');

let app = express()

// 处理post请求
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 设置静态文件路径
// app.set('public', __dirname + '/public');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + 'public'));

/*
 * 模板开始
 * 设置视图根目录
 * 设置视图格式（本人不太喜欢用jade，接下来会交大家使用html格式的文件）
 */
const ejs = require('ejs');
app.set('views', __dirname + '/views');
app.engine("html", ejs.renderFile);
app.set('view engine', 'ejs');


/*
 * cors 跨域
 * whitelist 白名单
 * 注意：cors 需要在 router 前挂载
*/
var whitelist = ['http://localhost:8081', 'null']
app.use(cors({
  credentials: true,
  // methods: ['GET', 'POST'],
  // alloweHeaders: ['Conten-Type', 'Authorization',  ''],
  optionsSuccessStatus: 200,
  origin: (origin, callback) => {
    whitelist.indexOf(origin) != -1
     ? callback(null, true)
     : callback(new Error('Not allowed by CORS'));
  }
}));

// 加载路由
app.use(router);

// const host = ip.address();
let port = (function () { // 检查启动服务时是否指定端口，若没有则返回默认端口： 8080
  if (typeof (process.argv[2]) !== 'undefined') {
    return isNaN(process.argv[2]) ? false : process.argv[2];
  } else {
    return 8080
  }
})()

function Server(port, host) {
  if (!port) return console.log('端口号应该为数字');

  let server = app.listen(port, host)
  server.on('error', err => {
    if (err.code === 'EADDRINUSE') {
      Server(++port, host)
    }
  })

  server.on('listening', () => {
    console.log('服务已启动！')
    console.log('端口：http://%s:%s', host, port)
  })
}
Server(port, '127.0.0.1')
// Server(port, host)


app.get('/login', (require, res) => {
  console.log(123);
})

// router.post('/', (require, res) =>{
//   const url = require.body.url
//   const title = require.body.title
//   res.render(url, {title});
// })
