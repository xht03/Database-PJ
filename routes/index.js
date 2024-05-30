var express = require('express');
var session = require('express-session');
var router = express.Router();
var db = require('../sql.js');

/* GET home page. */
router.get('', function(req, res, next) {
  res.render('index');
});

router.post('/main', function(req, res, next) {
  // 获取表单数据
  var val = req.body;
  var userName = val.userName;
  var passWord = val.userPwd;
  // 查询数据库
  db.query('SELECT * FROM users WHERE username = $1 AND password = $2', [userName, passWord], function(err, result) {
    if (err) {
      res.end()
      throw err;
    } else {
      if (result.rows.length > 0) {
        req.session.userName = userName;
        res.render('main');
      } else {
        res.end('Login failed');
      }
    }
  });
});

module.exports = router;
