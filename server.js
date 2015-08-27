var express = require('express');
var app = express();
//var mongoose = require('mongoose');
var routes = require('./routes/index');
//var passport = require('passport');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
//var session = require('express-session');
//var csurf = require('csurf');
var fs = require('fs');


//// uses mongoose connect to our database
//mongoose.connect('mongodb://localhost/cat-test');
//require('./auth/passport')(passport); // pass passport for configuration
//
// helmet helps stop XSS attacks, uses several other pieces of middleware, if you want more info look at https://github.com/helmetjs/helmet
app.use(helmet());
//
//// configure app to use bodyParser()
//// this will let us get the data from a POST
//app.use(bodyParser.urlencoded({
//    extended: true
//}));
app.use(bodyParser.json());
//app.use(cookieParser());
//
//app.use(session({
//    secret: 'thisismysecret',
//    saveUninitialized: true,
//    resave: false
//}));
//// Initialize Passport!  Also use passport.session() middleware, to support
//// persistent login sessions (recommended).
//app.use(passport.initialize());
//app.use(passport.session());
//
//app.use(csurf());
//
//app.use(function (req, res, next) {
//    res.cookie('XSRF-TOKEN', req.csrfToken());
//  next();
//});
//// tells express where to point the server to the front-end resources
app.use(express.static(__dirname + '/www'));

// start using our API routes
app.use('/', routes);


// starts the node/express server
var server = app.listen(4021, function () {

    var port = server.address().port;

    console.log('The party is happening at http://localhost:%d', port);
});
