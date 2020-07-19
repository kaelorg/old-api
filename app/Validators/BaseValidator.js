class BaseValidator {
  get validateAll() {
    return true;
  }

  fails(errorMessages) {
    return this.ctx.response
      .status(400)
      .send(
        Object.assign(errorMessages[0], { errors: errorMessages.slice(1) }),
      );
  }
}

module.exports = BaseValidator;
