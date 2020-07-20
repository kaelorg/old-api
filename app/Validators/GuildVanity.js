/** @type {typeof import('@adonisjs/validator/src/Validator')} */
const { rule } = use('Validator');

const BaseValidator = require('./BaseValidator');

class GuildVanityValidator extends BaseValidator {
  get rules() {
    return {
      user: [rule('required'), rule('min', 18), rule('max', 18)],
      role: [rule('required'), rule('min', 18), rule('max', 18)],
      time: [
        rule('required'),
        rule('number'),
        rule('in', [14400000, 86400000, 604800000, 2592000000, 7776000000]),
      ],
    };
  }
}

module.exports = GuildVanityValidator;
