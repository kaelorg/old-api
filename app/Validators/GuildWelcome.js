/** @type {typeof import('@adonisjs/validator/src/Validator')} */
const { rule } = use('Validator');

const BaseValidator = require('./BaseValidator');

class GuildWelcomeValidator extends BaseValidator {
  get rules() {
    return {
      active: [rule('boolean')],
      channel: [rule('min', 18), rule('max', 18)],
      message: [rule('min', 1), rule('max', 700)],
    };
  }
}

module.exports = GuildWelcomeValidator;
