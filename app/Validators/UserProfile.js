/** @type {typeof import('@adonisjs/validator/src/Validator')} */
const { rule } = use('Validator');

class UserProfileValidator {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      bio: [rule('required'), rule('min', 1), rule('max', 130)],
      favColor: [rule('required'), rule('regex', /^#([a-fA-F0-9]{3}){1,2}$/)],
      background: [
        rule('required'),
        rule(
          'regex',
          /^https:\/\/i\.imgur\.com\/[a-zA-Z0-9]{7}\.(png|jpg|jpeg)$/,
        ),
      ],
    };
  }

  get messages() {
    return {
      'bio.required': 'You must provide the user bio.',
      'favColor.required': 'You must provide the user favorite color.',
      'background.required': 'You must provide the user background.',
    };
  }

  fails(errorMessages) {
    return this.ctx.response
      .status(400)
      .send(
        Object.assign(errorMessages[0], { errors: errorMessages.slice(1) }),
      );
  }
}

module.exports = UserProfileValidator;
