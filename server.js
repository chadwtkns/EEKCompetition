var express = require('express');
var app = express();
//var mongoose = require('mongoose');
var routes = require('./routes/index');
//var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var session = require('express-session');
//var csurf = require('csurf');
var compression = require('compression');
var fs = require('fs');
var config = require('./config').development;

var dir = './uploads';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
app.use(compression());
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
app.use(cookieParser(config.secret));

app.use(express.static(__dirname + '/www'));

// start using our API routes
app.use('/', routes);

// var server = http.createServer(app).listen(4021);

// starts the node/express server
var server = app.listen(config.port, function () {

    var port = server.address().port;

    console.log('http://localhost:%d', port);
});

// var binaryserver = new BinaryServer({server: server, path: '/binary-endpoint'});

// binaryserver.on('connection', function(client){
//   var file = fs.createReadStream(__dirname + '/../../uploads/' + res.videoName[0].uploadedFileName);
//   client.send(file);
// });
// module.exports = binaryserver;
