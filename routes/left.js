var express = require('express');
var router = express.Router();

/* GET left page. */
router.get('', function(req, res, next) {
  res.render('left');
});


module.exports = router;