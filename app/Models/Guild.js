const BaseModel = require('./BaseModel');
const GuildSchema = require('../Schemas/Guild');
const { DEFAULTS } = require('../../src/utils/Constants');

class GuildModel extends BaseModel {
  static get schema() {
    return GuildSchema;
  }

  get defaultValue() {
    return {
      prefix: DEFAULTS.PREFIX,
      language: DEFAULTS.LANGUAGE,
      social: { bank: 0 },
      vanity: { users: [] },
      freeze: { users: [] },
      nivel: { active: false },
      count: { active: false },
      suggestion: { active: false },
      autorole: { active: false, roles: [] },
      welcome: {
        leave: {
          active: false,
          message: DEFAULTS.LEAVE_WELCOME_MESSAGE,
        },
        input: {
          active: false,
          message: DEFAULTS.INPUT_WELCOME_MESSAGE,
        },
        private: {
          active: false,
          message: DEFAULTS.PRIVATE_WELCOME_MESSAGE,
        },
      },
      harrypotter: {
        houseRoles: {},
        housePoints: {
          gryffindor: 0,
          slytherin: 0,
          ravenclaw: 0,
          hufflepuff: 0,
        },
      },
    };
  }
}

module.exports = GuildModel.buildModel('Guild');
