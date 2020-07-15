/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with SQL databases.
  |
  */
  connection: Env.get('DB_CONNECTION', 'sqlite'),

  /*
  |--------------------------------------------------------------------------
  | MongoDB
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for MongoDB database.
  |
  */
  mongodb: {
    connectionString: Env.get('MONGO_CONNECTION_STRING', null),
    connection: {
      debug: false,
      port: Env.get('MONGO_PORT', 27017),
      user: Env.get('MONGO_USER', 'admin'),
      host: Env.get('MONGO_HOST', 'localhost'),
      database: Env.get('MONGO_DATABASE', 'dev'),
      pass: Env.get('MONGO_PASSWORD', 'password'),
      options: {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 10,
        keepAliveInitialDelay: 15000,
        serverSelectionTimeoutMS: 15000,
      },
    },
  },
};
