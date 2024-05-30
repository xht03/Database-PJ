var express = require('express');
var router = express.Router();
var db = require('../sql.js');

/* GET deletebook page. */
router.get('/', function(req, res, next) {
  var isbn = req.query.isbn;
  db.query('DELETE FROM books WHERE isbn = $1', [isbn], function(err, result) {
    if (err) {
      throw err;
    } else {
      res.redirect('/book');
    }
  });
});

module.exports = router;