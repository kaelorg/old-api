const GuildSchema = require('../Schemas/Guild');

/** @type {typeof import('adonis-mongoose-model/src/Model/Base')} */
const BaseModel = use('MongooseModel');

/**
 * @class Guild
 */
class Guild extends BaseModel {
  /**
   * Guild's schema
   */
  static get schema() {
    return GuildSchema;
  }
}

module.exports = Guild.buildModel('Guild');
