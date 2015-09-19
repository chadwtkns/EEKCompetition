var router = require('express').Router();
var bcrypt = require('bcrypt');
var config = require('../../config').development;




router.post('/signup', function(req, res, next) {
  bcrypt.genSalt(13, function(err, salt) {
    bcrypt.hash('Test Password', salt, function (err, hash) {
      console.log(hash);
      r.connect(config.database, function (err, conn) {
        if (err) {
          return next(err);
        }
        //TODO Finish admin signup
        r.table('admin').insert();
      });
    });
  });

});


router.post('/login', function(req, res, next) {
  if(!req.body.email || !req.body.password){
    return res.json([{error: 'Incorrect email or password'}]);
  }
  r.connect(config.database, function (err, conn) {
    if (err) {
      return next(err);
    }

    r.table('competition').filter({
      email: req.body.email
    }).run(conn, function (err, cursor) {

      if (err) {
        return next(err);
      }

      cursor.toArray(function (err, result) {

        if (err) {
          return next(err);
        }
        res.json(result);

      });
    });
  });


});

module.exports = router;
