/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

module.exports = {
  authenticator: 'jwt',
  jwt: {
    scheme: 'jwt',
    serializer: 'mongoose',
    model: 'App/Models/User',
    options: {
      secret: Env.get('APP_KEY'),
    },
  },
};
