const BaseModel = require('./BaseModel');
const UserSchema = require('../Schemas/User');
const { IMAGES, DEFAULTS } = require('../../src/utils/Constants');

class User extends BaseModel {
  static get schema() {
    return UserSchema;
  }

  get defaultValue() {
    return {
      social: {
        bioColor: '',
        extract: [],
        rep: 0,
        perf: 0,
        bank: 0,
        koins: 0,
        charisma: 0,
        cooldownRob: 0,
        cooldownRep: 0,
        cooldownInt: 0,
        cooldownChar: 0,
        cooldownWork: 0,
        intelligence: 0,
        cooldownPerf: 0,
        cooldownDaily: 0,
        bio: DEFAULTS.BIOGRAPHY,
        favColor: DEFAULTS.FAV_COLOR,
        background: IMAGES.BACKGROUND,
      },
    };
  }
}

module.exports = User.buildModel('User');
