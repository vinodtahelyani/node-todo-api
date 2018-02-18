var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.PORT = 3002;
} else if (env === 'test') {
  process.env.PORT = 3002;
}
process.env.MONGODB_URI = 'mongodb://test:test@ds247027.mlab.com:47027/todo-api';
