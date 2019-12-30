/*
 *** 连接用户集合
 *** 给用户集合创建模型
*/

var mongo = require('./index.js');

var user = new mongo.Schema({
  'name': { type: String },
  'username': { type: String },
  'password': { type: String },
  'email': { type: String },
  'date': { type: String },
  'gender': { type: String },
  'telephone': { type: String },
  'imgUrl': { type: String, default: '/public/userImg/user.png'},
  'role': {type: String, default: '1'},
  'address': {type: String},
  'autograph': {type: String}
})

module.exports = mongo.model('user', user)