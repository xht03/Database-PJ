var express = require('express');
var router = express.Router();
var db = require('../sql.js');

/* GET searchbook page. */
router.post('/', function(req, res, next) {
  var isbn = req.body.isbn;
  var title = req.body.title;
  var author = req.body.author;
  var publisher = req.body.publisher;

  var query = 'SELECT * FROM books';
  var params = [];
  var conditions = [];

  if (isbn) {
    conditions.push('isbn = $' + (params.length + 1));
    params.push(isbn);
  }
  if (title) {
    conditions.push('title ILIKE $' + (params.length + 1));
    params.push('%' + title + '%');
  }
  if (author) {
    conditions.push('author ILIKE $' + (params.length + 1));
    params.push('%' + author + '%');
  }
  if (publisher) {
    conditions.push('publisher ILIKE $' + (params.length + 1));
    params.push('%' + publisher + '%');
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  db.query(query, params, function(err, data) {
    if (err) {
        throw err;
    } else {
        res.render('book', {book:data});
        console.log(data);
    }
  });

});

module.exports = router;