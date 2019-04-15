const express = require('express');
let router = express.Router();

router.get('/', (require, res) =>{
  let text = require.query.name
  res.render('index', { title: text});
})

module.exports = router