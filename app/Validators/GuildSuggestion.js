/** @type {typeof import('@adonisjs/validator/src/Validator')} */
const { rule } = use('Validator');

const BaseValidator = require('./BaseValidator');

class GuildSuggestionValidator extends BaseValidator {
  get rules() {
    return {
      active: [rule('boolean')],
      channel: [rule('min', 18), rule('max', 18)],
    };
  }
}

module.exports = GuildSuggestionValidator;
