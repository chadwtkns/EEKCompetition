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

        if(result.length == -1) {
          return res.json({error: 'Wrong email or password'});
        }
        bcrypt.compare(req.body.password,result[0].password, function (err, compared) {
          if (compared === false) {
            return res.json({success: false});
          }
          else {
            //expires in 15 minutes
            res.cookie('UCookie', result[0].role, { expires: new Date(Date.now() + 900000), httpOnly: true, signed: true });
            res.cookie('ICookie', 'adminView', { expires: new Date(Date.now() + 900000)});
            res.json({success: true});
          }
        });

      });
    });
  });


});

module.exports = router;
