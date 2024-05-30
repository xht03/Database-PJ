var express = require('express');
var router = express.Router();
var db = require('../sql.js');

router.post('/', function(req, res, next) {

    var isbn = req.body.isbn;
    var title = req.body.title;
    var author = req.body.author;
    var publisher = req.body.publisher;
    var stock = req.body.stock;
    var price = req.body.price;
        
    db.query('INSERT INTO books (isbn, title, author, publisher, stock, sales) VALUES ($1, $2, $3, $4, $5, $6)', [isbn, title, author, publisher, stock, price], function(err, result) {
        if (err) {
            throw err;
        }
        else{
            res.redirect('/book');
        }
    });

});

module.exports = router;