var express = require('express');
var router = express.Router();
var db = require('../sql.js');

router.post('/', function(req, res, next) {

    var isbn = req.body.isbn;
    var num = req.body.num;
    var price = req.body.price;
    var type = req.body.type;
        
    db.query('INSERT INTO bills (type, isbn, price, num, btime, status) VALUES ($1, $2, $3, $4, NOW(), \'Unpaid\')', [type, isbn, price, num], function(err, result) {
        if (err) {
            throw err;
        }
        else{
            res.redirect('/finance');
        }
    });

});

module.exports = router;