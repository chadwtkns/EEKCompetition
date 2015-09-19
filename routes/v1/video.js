var router = require('express').Router();
var r = require('rethinkdb');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var config = require('../../config').development;

var cookieValue = 1;


router.route('/')

.get(function (req, res, next) {
    r.connect(config.database, function (err, conn) {

      if (err) {
        return next(err);
      }

      r.table('competition').filter({
        owner: "EEK"
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
  })
  .post(function (req, res, next) {
    var permittedTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv', 'application/x-mpegURL', 'video/MP2T', 'video/3gpp'];
    var permittedExts = ['mov', 'wmv', 'avi', 'm4v', 'mp4', 'm4p', '3gp', 'm3u8', 'ts', '3gp'];
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

      var old_path = files.file.path,
        file_ext = files.file.name.split('.').pop().toLowerCase(),
        index = old_path.lastIndexOf('/') + 1,
        file_name = old_path.substr(index),
        new_path = path.join(process.env.PWD, '/uploads/', file_name + '.' + file_ext);

      fs.readFile(old_path, function (err, data) {
//        console.log(files.file);
//        console.log(file_ext);
        if (files.file.size <= 0){
          res.status(401);
          res.json({
            'reason': 'no video was submitted'
          });
          return;
        }
        if (permittedTypes.indexOf(files.file.type) == -1){
          res.status(401);
          res.json({
            'reason': 'file type not supported'
          });
          return;
        }
        if (permittedExts.indexOf(file_ext) == -1) {
          res.status(401);
          res.json({
            'reason': 'file extension not supported'
          });
          return;
        }
        // File size limit of 20MB or 15MB:15728640
        if (files.file.size > 20971520) {
          res.status(401);
          res.json({
            'reason': 'file size is too big'
          });
          return;
        }

        fs.writeFile(new_path, data, function (err) {
          fs.unlink(old_path, function (err) {
            var ALPHABET = '23456789bdefghijkmnpqrtuvwxyzBDEFGHIJKMNPQRTUVWXYZ';
            var idLength = 6;
            var i;
            var generate = function() {
              var rtn = '';
              for (i = 0; i < idLength; i += 1) {
                rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
              }
              return rtn;
            };
            if (err) {
              res.status(401);
              res.json({
                'success': false
              });
            } else {
              r.connect(config.database, function (err, conn) {

                if (err) {
                  return next(err);
                }

                fields.shortId = generate();

                fields.uploadedFileName = file_name + '.' + file_ext;

                fields.createdAt = r.now();

                fields.approved = 0;

                fields.votes = 0;

                r.table('videos').insert(fields, {
                  returnChanges: true
                }).run(conn, function (err, result) {
                  if (err) {
                    return next(err);
                  }
                  res.redirect('/#/');
                });
              });
            }
          });
        });
      });
    });
  });
router.param('id', function (req, res, next, id) {
  req.videoId = id;
  next();
});

router.route('/:id')
.get(function (req, res, next) {
      r.connect(config.database, function (err, conn) {

      if (err) {
        return next(err);
      }

      r.table('videos').filter({
        shortId: req.videoId
      }).run(conn, function (err, cursor) {
        if (err) {
          return next(err);
        }
        cursor.toArray(function (err, result) {
          if (err) {
            return next(err);
          }
//          console.log(result[0].uploadedFileName);
          res.json(result);
//          var options = {
//            root: __dirname + '../../../uploads/',
//            dotfiles: 'deny',
//            headers: {
//                'x-timestamp': Date.now(),
//                'x-sent': true
//            }
//          };
//          res.sendFile(result[0].uploadedFileName, options, function (err) {
//            if (err) {
//              console.log(err);
//              res.status(err.status).end();
//            }
//            else {
//              console.log('Sent:', result[0].uploadedFileName);
//            }
//          });

        });
      });
    });
})

.put(function (req, res, next) {
  if (!req.body.votes) {
    return res.json([{voteError: 'No vote was cast'}]);
  }
  if (req.signedCookies.rememberme >= 3) {
    return res.json([{voteError:'You have exceeded your vote limit'}]);
  }
  var voteUpdated = {votes: req.body.votes + 1};
  r.connect(config.database, function (err, conn) {
      if (err) {
        return next(err);
      }
      if (req.body.votes !== undefined) {
        r.table('emailCheck').insert({email: req.body.email})
          .run(conn, function (err, result) {
            r.table('emailCheck').filter({email: req.body.email}).count()
              .run(conn, function (err, result) {
                if(result > 3) {
                  return res.json([{voteError:'You have exceeded your vote limit'}]);
                }
            });
        });
      }
      r.table('videos').filter({
        shortId: req.videoId
      }).update(voteUpdated).run(conn, function (err, result) {
        if (err) {
          return next(err);
        }
        r.table('videos').filter({
          shortId: req.videoId
        }).pluck('votes').run(conn, function (err, cursor) {
        if (err) {
          return next(err);
        }
        cursor.toArray(function (err, result) {
          if (err) {
            return next(err);
          }

          res.cookie('rememberme', cookieValue, { expires: new Date(Date.now() + 900000), httpOnly: true, signed: true });
          cookieValue += 1;
          res.json(result);

          });
        });
      });
    });
});

router.all(':id/comment/:id', function (req, res, next) {

});

module.exports = router;
