var express = require('express');
var router = express.Router();

/* GET logout page. */

router.get('/logout', function(req, res){
    req.session.destroy(function(err){
       if(err){
          console.log(err);
       } else {
          res.redirect('/admin');
       }
    });
 });

module.exports = router;