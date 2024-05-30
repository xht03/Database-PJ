var express = require('express');
var router = express.Router();
var db = require('../sql.js');
const { isArray } = require('jquery');

/* GET book page. */
router.get('/', function(req, res, next) {
  var userName = req.session.userName;
  db.query('SELECT * FROM users WHERE username = $1', [userName], function(err, result1) {
    if (err) {
      throw err;
    } else {
      if (result1.rows.length > 0 && result1.rows[0].role === 'superadmin') {
        db.query('SELECT * FROM users', function(err, result2) {
          if (err) {
            throw err;
          } else {
            res.render('user', {self: result1.rows[0], other: result2.rows});
          }
        });
      }
      else {
        res.render('user', {self: result1.rows[0], other: []});
      }
    }
  });
});

module.exports = router;