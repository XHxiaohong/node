
/*
 *** 连接菜单集合
 *** 给菜单集合创建模型
*/

var mongo = require('./index.js');

var meun = new mongo.Schema({
  // '_id': { type: String },
  'meunName': { type: String },
  'meunPath': { type: String },
  'meunIcon': { type: String },
  'meunID': { type: Number },
  'fatherID': { type: Number,  default: 0 },
  'length': { type: Number }
})



meun.statics = {
  addNumber(id, cb) {
    this.findOneAndUpdate(
      { _id: id },
      { $inc: { length: 1 }   },
      { new: true  },
      cb
    );
  },
  addMeunID (id, callback) {
    this.findByIdAndUpdate(id ,
      { $inc: { meunID: 1 } },  // 每次自增长1
      { new: true, upsert: true }, // 设置true 获取的是更新之后的值
      callback
    )
  }
};


const meuns = mongo.model('meun', meun)

// var entitySchema = mongo.Schema({
//   testvalue: {type: String}
// });

meun.pre('save', function (next) {
  console.log(this, 'pre save')
  next()
})

module.exports = meuns