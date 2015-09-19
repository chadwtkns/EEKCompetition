var router = require('express').Router();

router.get('/', function (req, res, next) {
  res.json({success: true});
});

router.use('/video', require('./video'));
//router.use('/competition', require('./competition'));
//router.use('/topTen', require('./topTen'));
router.use('/auth', require('./auth'));

module.exports = router;
