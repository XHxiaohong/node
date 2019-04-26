const process =  require('process');
const express =  require('express');
const path =  require('path');
const bodyParser = require('body-parser');
const lessMiddleware = require('less-middleware');
// const ejs = require('ejs');

const router = require('./router');

let app = express()

// 设置静态文件路径
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(__dirname + 'public'));

// 模板开始
//设置视图根目录
//设置视图格式（本人不太喜欢用jade，接下来会交大家使用html格式的文件）
app.set('views', __dirname + '/views');
// app.engine("html", ejs.renderFile);
app.set('view engine', 'ejs');


// node post请求无法直接获取body， 返回undefined
// json 解析器，添加该中间件可以接受json格式的请求数据
// urlencoded 解析器，添加该中间件可以接受 非JSON 格式的请求数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 引进 less 中间件
app.use(lessMiddleware('.less', {
  dest: '.css',
  pathRoot: path.join(__dirname, 'public')
}))

// 加载路由
app.use(router)

const host = '127.0.0.1'
let port = (function() {
  // 检查启动服务时是否指定端口，若没有则返回默认端口： 8080
  if (typeof (process.argv[2]) !== 'undefined') {
    // @ts-ignore
    if (isNaN(process.argv[2])) {
      console.log('端口号应该为数字')
      return false
    } else {
      return process.argv[2]
    }
  } else {
    return 8080
  }
})()

const hostPort = `http://${host}:${port}`
function Server (port, host) {
  let server = app.listen(port, host)

  server.on('error', err=>{
    // @ts-ignore
    // 检查默认端口是否被占用，若占用自动加一
    if (err.code === 'EADDRINUSE') {
      port += 1
      Server(port, host)
    }
  })
  
  server.on('listening', () => {
    console.log('服务已启动！')
    console.log(hostPort)
  })
} 
Server(port, host)

router.get('/', (require, res) =>{
  const url = require.query.url || 'login'
  const title = require.query.title ||'用户登录'
  const obj = { title }
  if (title === '用户登录')
    obj.hostPort = hostPort
  res.render(url, obj);
})

router.post('/', (require, res) =>{
  const url = require.body.url
  const title = require.body.title

  res.render(url, {title});
})
