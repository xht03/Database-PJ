var express = require('express');
var router = express.Router();
var db = require('../sql.js');

/* GET finance page. */
router.get('/', function(req, res, next) {
  db.query('SELECT * FROM bills NATURAL LEFT JOIN books', function(err, result) {
    if (err) {
      throw err;
    } else {
      res.render('finance', {finance:result});
      console.log(result);
    }
  });
});

module.exports = router;
