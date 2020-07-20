class BaseValidator {
  get validateAll() {
    return true;
  }

  fails(errorMessages) {
    return this.ctx.response
      .status(400)
      .send({ ...errorMessages[0], errors: errorMessages });
  }
}

module.exports = BaseValidator;
