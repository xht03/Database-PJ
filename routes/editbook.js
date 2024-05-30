var express = require('express');
var router = express.Router();
var db = require('../sql.js');

/* GET editbook page. */
router.post('/', function(req, res, next) {

    var isbn = req.body.isbn;
    var title = req.body.title;
    var author = req.body.author;
    var publisher = req.body.publisher;
    var stock = req.body.stock;
    var price = req.body.price;
        
    db.query('UPDATE books SET title = $1, author = $2, publisher = $3, stock = $4, sales = $5 WHERE isbn = $6', [title, author, publisher, stock, price, isbn], function(err, result) {
        if (err) {
            throw err;
        }
        else{
            res.redirect('/book');
        }
    });

});

module.exports = router;