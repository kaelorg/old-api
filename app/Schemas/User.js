const { Schema } = require('mongoose');

const { IMAGES, DEFAULTS } = require('../../src/utils/Constants');

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
  bio: { type: String, default: DEFAULTS.BIOGRAPHY },
  favColor: { type: String, default: DEFAULTS.FAV_COLOR },
  background: { type: String, default: IMAGES.BACKGROUND },
});

module.exports = {
  social: SocialSchema,
  _id: { type: String, required: true },
};
