var router = require('express').Router();
var r = require('rethinkdb');


router.route('/')

.get(function (req, res, next) {
    r.connect({ host: 'localhost', port: 28015, db: 'EEKTest' }, function(err, conn) {

    if(err) {return next(err);}

    r.table('competition').filter({owner: "EEK"}).run(conn, function(err, cursor) {

      if(err) {return next(err);}

      cursor.toArray(function(err, result) {

        if(err) {return next(err);}
        res.json(result);

      });
    });
  });
})
.post(function (req, res, next) {
 var formItem = req.body;
    r.connect({ host: 'localhost', port: 28015, db: 'EEKTest' }, function(err, conn) {

    if(err) {return next(err);}

    formItem.createdAt = r.now();

    r.table('videos').insert(formItem, {returnChanges: true}).run(conn, function(err, result) {
      if(err) {
        return next(err);
      }
      res.json(result.changes[0].new_val);
    });
  });
});


router.all('/:id', function (req, res, next) {

});

router.all(':id/comment/:id', function (req, res, next) {

});

module.exports = router;
