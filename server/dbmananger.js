const mongoose = require('mongoose');

const isProduction = process.env.NODE_ENV === 'production';
const connectionString = isProduction ? process.env.MONGODB_URL : 'mongodb://localhost/stock';


mongoose.Promise = global.Promise;

// Create the database connection
mongoose.connect(connectionString, {
    useMongoClient: true,
});

// Set debug if not in production mode
mongoose.set('debug' , isProduction);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + connectionString);
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose connection disconnected through app termination');
        process.exit(0);
    });
});