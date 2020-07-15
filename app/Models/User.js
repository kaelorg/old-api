const UserSchema = require('../Schemas/User');

/** @type {typeof import('adonis-mongoose-model/src/Model/Base')} */
const BaseModel = use('MongooseModel');

/**
 * @class User
 */
class User extends BaseModel {
  /**
   * User's schema
   */
  static get schema() {
    return UserSchema;
  }

  static get primaryKey() {
    return 'id';
  }
}

module.exports = User.buildModel('User');
