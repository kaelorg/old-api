/** @type {typeof import('@adonisjs/validator/src/Validator')} */
const { rule } = use('Validator');

class UserProfileValidator {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      bio: 'required',
      favColor: [rule('required'), rule('regex', /^#([A-F0-9]{3}){1,2}$/i)],
      background: [
        rule('required'),
        rule(
          'regex',
          /^https:\/\/i\.imgur\.com\/[A-Z0-9]{7}\.(png|jpg|jpeg)$/i,
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
    return this.ctx.response.status(400).send(errorMessages);
  }
}

module.exports = UserProfileValidator;
