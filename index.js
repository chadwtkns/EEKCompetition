//Initializes the Server and Routes
require('./server')(function (err) {
    if (err) {
        throw err;
    }
});
