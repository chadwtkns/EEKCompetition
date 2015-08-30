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
    var permittedTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv'];
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

      var old_path = files.file.path,
        file_size = files.file.size,
        file_ext = files.file.name.split('.').pop(),
        index = old_path.lastIndexOf('/') + 1,
        file_name = old_path.substr(index),
        new_path = path.join(process.env.PWD, '/uploads/', file_name + '.' + file_ext);

      fs.readFile(old_path, function (err, data) {
        if (permittedTypes.indexOf(files.file.type) == -1){
          res.status(401);
          res.json({
            'reason': 'file type not supported'
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
