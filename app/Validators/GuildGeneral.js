/** @type {typeof import('@adonisjs/validator/src/Validator')} */
const { rule } = use('Validator');

const BaseValidator = require('./BaseValidator');

class GuildGeneralValidator extends BaseValidator {
  get rules() {
    return {
      prefix: [rule('required'), rule('min', 1), rule('max', 5)],
    };
  }

  get messages() {
    return {
      'prefix.required': 'You must provide the guild prefix',
    };
  }
}

module.exports = GuildGeneralValidator;
