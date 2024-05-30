var express = require('express');
var router = express.Router();
var db = require('../sql.js');

/* GET edituser page. */
router.post('/', function(req, res, next) {
    var userName = req.session.userName;

    var id = req.body.id;
    var username = req.body.username;
    var password = req.body.password;
    var realname = req.body.realname;
    var gender = req.body.gender;
    var age = req.body.age;
    var role = req.body.role;

    if(username === userName){
        if (id && password && realname && gender && age && role) {
            db.query('UPDATE users SET id = $1, password = $2, realname = $3, gender = $4, age = $5, role = $6 WHERE username = $7', [id, password, realname, gender, age, role, username], function(err, result) {
                if (err) {
                    throw err;
                }
                else{
                    res.redirect('/user');
                }
            });
        }
        else {
            res.end('All fields must be filled');
        }
    }
    else {
        db.query('SELECT * FROM users WHERE username = $1', [userName], function(err, result1) {
            if (err) {
              throw err;
            } 
            else {
              if (result1.rows.length > 0 && result1.rows[0].role === 'superadmin') {
                if (id && password && realname && gender && age && role) {
                    db.query('UPDATE users SET id = $1, password = $2, realname = $3, gender = $4, age = $5, role = $6 WHERE username = $7', [id, password, realname, gender, age, role, username], function(err, result) {
                        if (err) {
                            throw err;
                        }
                        else{
                            res.redirect('/user');
                        }
                    });
                } 
                else {
                    res.end('All fields must be filled');
                }
              } 
              else {
                res.end('User ' + userName + ' is not a superadmin');
              }
            }
        });  
    }
});

module.exports = router;