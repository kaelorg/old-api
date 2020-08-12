const { GuildSchema, GuildConnection } = require('@kaeltec/database');

const BaseModel = require('./BaseModel');

const model = new GuildConnection();

class GuildModel extends BaseModel {
  static get schema() {
    return GuildSchema;
  }

  get defaultValue() {
    return model.defaultValue;
  }
}

module.exports = GuildModel.buildModel('Guild');
