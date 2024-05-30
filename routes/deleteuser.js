var express = require('express');
var router = express.Router();
var db = require('../sql.js');

/* GET deletebook page. */
router.get('/', function(req, res, next) {
  var userName = req.session.userName;
  
  var id = req.query.id;

  db.query('SELECT * FROM users WHERE username = $1', [userName], function(err, result1) {
    if (err) {
      throw err;
    } 
    else {
      if (result1.rows.length > 0 && result1.rows[0].role === 'superadmin') {
        db.query('DELETE FROM users WHERE id = $1', [id], function(err, result) {
          if (err) {
            throw err;
          } else {
            res.redirect('/user');
          }
        });
      } 
      else {
        res.end('User ' + userName + ' is not a superadmin');
      }
    }
  });
});

module.exports = router;