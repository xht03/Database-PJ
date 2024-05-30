var express = require('express');
var router = express.Router();
var db = require('../sql.js');

/* GET cancelfinance page. */
router.get('/', function(req, res, next) {
  var id = req.query.id;
  db.query('SELECT status FROM bills WHERE id = $1', [id], function(err, result) {
    if (err) {
      throw err;
    } else {
      if (result.rows[0].status === 'Unpaid') {
        db.query('DELETE FROM bills WHERE id = $1', [id], function(err, result) {
          if (err) {
            throw err;
          } else {
            res.redirect('/finance');
          }
        });
      } else {
        res.send('The bill has been paid and cannot be canceled.');
      }
    }
  });
});

module.exports = router;