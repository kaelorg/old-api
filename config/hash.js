/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

module.exports = {
  driver: Env.get('HASH_DRIVER', 'bcrypt'),
  argon: {
    type: 1,
  },
  bcrypt: {
    rounds: 10,
  },
};
