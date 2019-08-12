// @ts-nocheck
const ip = require('ip');
const cors = require('cors');
const path =  require('path');
const express =  require('express');
const process =  require('process');
const bodyParser = require('body-parser');

const router = require('./router');

let app = express()

// 处理post请求
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 加载路由
app.use(router)


var whitelist = ['http://localhost:8081', 'http://127.0.0.1:8080', 'null', undefined]
app.use(cors({
  credentials: true,
  optionsSuccessStatus: 200,
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) != -1) {
      callback(null, true)
    } else {
      console.log('Not allowed by CORS', origin)
      callback(new Error('Not allowed by CORS'))
    }
  }
}))


const host = ip.address();
let port = (function() { // 检查启动服务时是否指定端口，若没有则返回默认端口： 8080
  if (typeof (process.argv[2]) !== 'undefined') {
    return isNaN(process.argv[2]) ? false : process.argv[2];
  } else {
    return 8080
  }
})()

function Server (port, host) {
  if (!port) return console.log('端口号应该为数字');

  let server = app.listen(port, host)
  server.on('error', err=>{
    if (err.code === 'EADDRINUSE') {
      Server(++port, host)
    }
  })
  
  server.on('listening', () => {
    console.log('服务已启动！')
    console.log('端口：http://%s:%s/app/public/index.html', host, port)
  })
} 
Server(port, host)



// 设置静态文件路径
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + 'public'));
// 模板开始
// 设置视图根目录
// 设置视图格式（本人不太喜欢用jade，接下来会交大家使用html格式的文件）
const ejs = require('ejs');
app.set('views', __dirname + '/views');
app.engine("html", ejs.renderFile);
app.set('view engine', 'ejs');
router.get('/', (require, res) =>{
  const url = require.query.url || 'login'
  const title = require.query.title ||'用户登录'
  const obj = { title }
  if (title === '用户登录')
    obj.hostPort = 'http://127.0.0.1:8080'
  res.render(url, obj);
})
// router.post('/', (require, res) =>{
//   const url = require.body.url
//   const title = require.body.title
//   res.render(url, {title});
// })



// import Vue from 'vue'

// export default {//加密
//   encrypt(word, keyStr){ 
//     keyStr = keyStr ? keyStr : 'abcdefgabcdefg12';
//     var key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
//     var srcs = CryptoJS.enc.Utf8.parse(word);
//     var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
//     return encrypted.toString();
//   },
//   //解密
//   decrypt(word, keyStr){  
//     keyStr = keyStr ? keyStr : 'abcdefgabcdefg12';
//     var key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
//     var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
//     return CryptoJS.enc.Utf8.stringify(decrypt).toString();
//   }

// }