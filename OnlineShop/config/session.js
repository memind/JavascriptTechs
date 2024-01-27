const expressSession = require('express-session');
const mongoDbStore = require('connect-mongodb-session');

function createSessionStore() {
  const MongoDBStore = mongoDbStore(expressSession);

  const store = new MongoDBStore({
    uri: 'mongodb+srv://memind:jYWydXXZ04CXS4Oq@nodejslearningcluster.tip00rz.mongodb.net/?retryWrites=true&w=majority',
    databaseName: 'online-shop-db',
    collection: 'sessions'
  });

  return store;
}

function createSessionConfig() {
  return {
    secret: 'In My Darkest Hour',
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000
    }
  };
}

module.exports = createSessionConfig;