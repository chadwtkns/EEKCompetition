var router = require('express').Router();
var bcrypt = require('bcrypt');
var r = require('rethinkdb');
var config = require('../../config').development;


//TODO get rid of JSON vulnerability

router.post('/signup', function(req, res, next) {
  bcrypt.genSalt(14, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      req.body.password = hash;
      r.connect(config.database, function (err, conn) {
        if (err) {
          return next(err);
        }
        //TODO Check if email already exists
        req.body.createdAt = r.now();
        req.body.role = 'admin';
        r.table('admin').insert(req.body).run(conn, function (err, result) {
          if (err) {
            return next(err);
          }
         res.json([{success: true}]);
        });
      });
    });
  });

});


router.post('/login', function(req, res, next) {
  if(!req.body.email || !req.body.password){
    return res.json([{error: 'Missing email or password'}]);
  }
  r.connect(config.database, function (err, conn) {
    if (err) {
      return next(err);
    }

    r.table('admin').filter({
      email: req.body.email
    }).run(conn, function (err, cursor) {

      if (err) {
        return next(err);
      }
      cursor.toArray(function (err, result) {

        if (err) {
          return next(err);
        }
        console.log(result[0].password);
        console.log(req.body.password);
        if(result.length == -1) {
          return res.json({error: 'Wrong email or password'});
        }
        //TODO check for empty array if email does not match
        bcrypt.compare(req.body.password,result[0].password, function (err, result) {
          if (result === false) {
            console.log(result);
            return res.json({success: false});
          }
          else {
            res.json({success: true});
          }
        });
        //TODO set up a session for the admin
        // res.json(result);

      });
    });
  });


});

module.exports = router;
