var router = require('express').Router();
var r = require('rethinkdb');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');


router.route('/')

.get(function (req, res, next) {
    r.connect({
      host: 'localhost',
      port: 28015,
      db: 'EEKTest'
    }, function (err, conn) {

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
        console.log(files.file);
        console.log(file_ext);
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
        // File size limit of 15MB
        if (files.file.size > 15728640) {
          res.status(401);
          res.json({
            'reason': 'file size is too big'
          });
          return;
        }

        fs.writeFile(new_path, data, function (err) {
          fs.unlink(old_path, function (err) {
            if (err) {
              res.status(401);
              res.json({
                'success': false
              });
            } else {
              r.connect({
                host: 'localhost',
                port: 28015,
                db: 'EEKTest'
              }, function (err, conn) {

                if (err) {
                  return next(err);
                }
                fields.uploadedFileName = file_name + '.' + file_ext;

                fields.createdAt = r.now();

                fields.approved = 0;

                r.table('videos').insert(fields, {
                  returnChanges: true
                }).run(conn, function (err, result) {
                  if (err) {
                    return next(err);
                  }
                  res.json(result.changes[0].new_val);
                });
              });
            }
          });
        });
      });
    });
  });


router.all('/:id', function (req, res, next) {

});

router.all(':id/comment/:id', function (req, res, next) {

});

module.exports = router;
