var express = require('express');
var router = express.Router();
var db = require('../sql.js');

router.post('/', function(req, res, next) {
    var userName = req.session.userName;

    var id = req.body.id;
    var username = req.body.username;
    var password = req.body.password;
    var realname = req.body.realname;
    var gender = req.body.gender;
    var age = req.body.age;
    var role = req.body.role;

    db.query('SELECT * FROM users WHERE username = $1', [userName], function(err, result1) {
        if (err) {
          throw err;
        } 
        else {
          if (result1.rows.length > 0 && result1.rows[0].role === 'superadmin') {
            db.query('INSERT INTO users (id, username, password, realname, gender, age, role) VALUES ($1, $2, $3, $4, $5, $6, $7)', [id, username, password, realname, gender, age, role], function(err, result) {
                if (err) {
                    throw err;
                }
                else{
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