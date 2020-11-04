const { UserSchema, UserConnection } = require('@kaelbot/database');

const BaseModel = require('./BaseModel');

const model = new UserConnection();

class UserModel extends BaseModel {
  static get schema() {
    return UserSchema;
  }

  static get model() {
    return model.model;
  }

  get defaultValue() {
    return model.defaultValue;
  }
}

module.exports = UserModel.buildModel('User');
