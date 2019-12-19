/*
 *** 连接用户集合
 *** 给用户集合创建模型
*/

var mongo = require('./index.js');

var user = new mongo.Schema({
  'username': {type: String},
  'password': {type: String},
  'email': {type: String}
})

module.exports = mongo.model('user', user)