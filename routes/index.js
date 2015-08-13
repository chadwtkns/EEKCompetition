var router = require('express').Router();

// Default route
router.all('/', function (req, res, next) {
    res.json({
        success: true,
        data: {
            versions: ['v1'],
            latest: 'v1'
        }
    });
});

// API version 1
router.use('/v1', require('./v1'));

// Not Found Handler
router.use(function (req, res, next) {
    res.status(404).json({
        success: false,
        error: 'NOT FOUND'
    });
});

// Server Error Handler
router.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'SERVER ERROR'
    });
});


module.exports = router;
