const { Schema } = require('mongoose');

const Constants = require('../../src/utils/constants');

// System - Social
const SocialSchema = new Schema({
  bioColor: String,
  extract: Array,
  rep: Number,
  perf: Number,
  bank: Number,
  koins: Number,
  charisma: Number,
  cooldownRob: Number,
  cooldownRep: Number,
  cooldownInt: Number,
  cooldownChar: Number,
  cooldownWork: Number,
  intelligence: Number,
  cooldownPerf: Number,
  cooldownDaily: Number,
  bio: { type: String, default: Constants.DEFAULTS.BIOGRAPHY },
  favColor: { type: String, default: Constants.DEFAULTS.FAV_COLOR },
  background: { type: String, default: Constants.IMAGES.BACKGROUND },
});

module.exports = {
  social: SocialSchema,
  _id: { type: String, required: true },
};
