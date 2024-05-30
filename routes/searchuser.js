var express = require('express');
var router = express.Router();
var db = require('../sql.js');

/* GET searchuser page. */
router.post('/', function(req, res, next) {
  var userName = req.session.userName;

  var id = req.body.id;
  var username = req.body.username;
  var role = req.body.role;

  var query = 'SELECT * FROM users';
  var params = [];
  var conditions = [];

  if (id) {
    conditions.push('id = $' + (params.length + 1));
    params.push(id);
  }
    if (username) {
        conditions.push('username = $' + (params.length + 1));
        params.push(username);
    }
    if (role) {
        conditions.push('role = $' + (params.length + 1));
        params.push(role);
    } 

    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    db.query('SELECT * FROM users WHERE username = $1', [userName], function(err, result1) {
        if (err) {
          throw err;
        } 
        else {
          if (result1.rows.length > 0 && result1.rows[0].role === 'superadmin') {
            db.query(query, params, function(err, result2) {
                if (err) {
                    throw err;
                } else {
                    res.render('user', {self:result1.rows[0], other:result2.rows});
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