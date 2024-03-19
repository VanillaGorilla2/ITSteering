const mongoose = require('mongoose');


// ES6 Promises
mongoose.Promise = global.Promise;

//connect to database before tests run

before(function(done) {
    // connect to mongodb

    mongoose.connect('mongodb://0.0.0.0/testaroo');

    mongoose.connection.once('open', function() {
        console.log('Connection has been made, now make fireworks...');
        done()
    }).on('error', function(error) {
        console.log('Connection error:', error);
    });

});


