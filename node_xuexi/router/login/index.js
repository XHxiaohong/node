const express = require('express');
let router = express.Router();

router.get('/', (require, res) =>{
  let text = require.query.name
  res.render('index', { title: text});
})

router.get('/jsonp', (require, res) =>{

  let obj = {
    name: require.query.name,
    pass: require.query.pass
  }
  let data = JSON.stringify(obj)
  let callback = `callback(${data})`

  res.send(callback);
})

router.get('/ajax', (require, res) =>{
  let obj = {
    name: require.query.name,
    pass: require.query.pass
  }
  res.json(obj);
})

router.post('/ajax', (require, res) =>{
  let obj = {
    name: require.body.name,
    pass: require.body.pass
  }

  res.json(obj);
})
module.exports = router