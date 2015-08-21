var router = require('express').Router();

router.all('/', function (req, res, next) {
    res.json({
        success: true,
        role: 'admin'
    });

});

module.exports = router;
