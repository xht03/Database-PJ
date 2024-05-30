var express = require('express');
var router = express.Router();
var db = require('../sql.js');
const { isArray } = require('jquery');

/* GET book page. */
router.get('/', function(req, res, next) {
  db.query('SELECT * FROM books', function(err, result) {
    if (err) {
      throw err;
    } else {
      res.render('book', {book:result});
      //console.log(result);
      //console.log(Array.isArray(result));
      //console.log(typeof result);
      //console.log(JSON.stringify(result, null, 2));
    }
  });
});

module.exports = router;