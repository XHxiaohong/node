/*
 *** 连接菜单集合
 *** 给菜单集合创建模型
*/

var mongo = require('./index.js');

var meun = new mongo.Schema({
  'meunName': { type: String },
  'meunPath': { type: String },
  'meunIcon': { type: String },
  'length': { type: Number }
})

module.exports = mongo.model('meun', meun)