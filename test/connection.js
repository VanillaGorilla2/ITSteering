const mongoose = require('mongoose');

// connect to mongodb

mongoose.connect('mongodb://0.0.0.0/testaroo');

mongoose.connection.once('open', function() {
    console.log('Connection has been made, now make fireworks...');
}).on('error', function(error) {
    console.log('Connection error:', error);
});