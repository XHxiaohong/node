// 连接数据库
const mongo = require('mongoose'),
      DB_URL = 'mongodb://localhost:27017/MyMongoDB'

mongo.connect(DB_URL, {useNewUrlParser: true}, (err)=> {
  if (err) {
    console.log('数据库连接错误：%s', err)
  } else {
    console.log('数据库连接成功: %s', DB_URL)
  }
})

// mongo.set('useFindAndModify', true);
mongo.set('useFindAndModify', false);

// const db = mongo.connection
// db.on('error', err => console.log('数据库连接错误：' + err))
// db.on('connected', () => console.log('数据库连接成功: '+ DB_URL))
// db.on('disconnected', () => console.log('数据库连接断开: '+ DB_URL))

module.exports = mongo
