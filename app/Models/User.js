const { UserSchema, UserConnection } = require('@kaeltec/database');

const BaseModel = require('./BaseModel');

const model = new UserConnection();

class UserModel extends BaseModel {
  static get schema() {
    return UserSchema;
  }

  get defaultValue() {
    return model.defaultValue;
  }
}

module.exports = UserModel.buildModel('User');
