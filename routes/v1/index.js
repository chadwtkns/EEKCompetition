var router = require('express').Router();

router.get('/', function (req, res, next) {
  res.json({success: true});
});

//router.use('/admin', require('./admin'));
//router.use('/instructor', require('./instructor'));
//router.use('/member', require('./member'));
//router.use('/auth', require('./auth'));

module.exports = router;
