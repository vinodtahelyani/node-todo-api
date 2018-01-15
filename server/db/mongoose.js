var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test:test@ds247027.mlab.com:47027/todo-api', { useMongoClient: true });

module.exports = {mongoose};