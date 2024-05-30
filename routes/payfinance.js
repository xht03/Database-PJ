var express = require('express');
var router = express.Router();
var db = require('../sql.js');

/* GET payfinance page. */
router.get('/', function(req, res, next) {
  var id = req.query.id;
  db.query('SELECT status FROM bills WHERE id = $1', [id], function(err, result) {
    if (err) {
      throw err;
    } else {
      if (result.rows[0].status === 'Unpaid') {
        db.query('UPDATE bills SET status = $1 WHERE id = $2', ['Paid', id], function(err, result) {
            if (err) {
              throw err;
            } else {
              res.redirect('/finance');
            }
        });
      } else {
        res.send('The bill has been paid');
      }
    }
  });
});

module.exports = router;