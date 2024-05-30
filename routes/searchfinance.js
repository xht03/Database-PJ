var express = require('express');
var router = express.Router();
var db = require('../sql.js');

/* GET searchfinance page. */
router.post('/', function(req, res, next) {
  var type = req.body.type;
  var status = req.body.status;
  var id = req.body.id;
  var isbn = req.body.isbn;
  var title = req.body.title;
  

  var query = 'SELECT * FROM bills NATURAL LEFT JOIN books';
  var params = [];
  var conditions = [];

  if (type) {
    conditions.push('type = $' + (params.length + 1));
    params.push(type);
  }
  if (status) {
    conditions.push('status = $' + (params.length + 1));
    params.push(status);
  }
  if (id) {
    conditions.push('id = $' + (params.length + 1));
    params.push(id);
  }
  if (isbn) {
    conditions.push('isbn = $' + (params.length + 1));
    params.push(isbn);
  }
  if (title) {
    conditions.push('title ILIKE $' + (params.length + 1));
    params.push('%' + title + '%');
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }


  db.query(query, params, function(err, data) {
    if (err) {
        throw err;
    } else {
        res.render('finance', {finance:data});
        console.log(data);
    }
  });

});

module.exports = router;