const { Schema } = require('mongoose');

const Constants = require('../../src/utils/constants');

// System - Social
const SocialSchema = new Schema({ bank: Number });

// System - Count
const CountSchema = new Schema({
  text: String,
  model: String,
  channel: String,
});

// System - Suggestion
const SuggestionSchema = new Schema({
  active: {
    type: Boolean,
    default: false,
  },
  channel: {
    type: String,
    required: true,
  },
});

// System - HarryPotter
const HarryPotterSchema = new Schema({
  houseRoles: {
    gryffindor: String,
    slytherin: String,
    ravenclaw: String,
    hufflepuff: String,
  },
  housePoints: {
    gryffindor: Number,
    slytherin: Number,
    ravenclaw: Number,
    hufflepuff: Number,
  },
});

// System - Ban Freeze
const UserFreezeSchema = new Schema({
  reason: String,
  _id: { type: String, required: true },
  time: { type: Number, required: true },
  timestamp: { type: Number, default: Date.now() },
});

const FreezeSchema = new Schema({
  role: String,
  channel: String,
  users: [UserFreezeSchema],
});

// System - Vanity
const UserVanitySchema = new Schema({
  addedBy: { type: String },
  _id: { type: String, required: true },
  role: { type: String, required: true },
  time: { type: Number, required: true },
  timestamp: { type: Number, default: Date.now() },
});

const VanitySchema = new Schema({ users: [UserVanitySchema] });

// System - Nivel
const RoleNivelSchema = new Schema({
  _id: { type: String, required: true },
  level: { type: Number, required: true },
});

const NivelSchema = new Schema({
  roles: [RoleNivelSchema],
  active: { type: Boolean, default: false },
  message: { type: String, default: Constants.DEFAULTS.LEVEL_UP_MESSAGE },
});

// System - Welcome
const LeaveWelcomeSchema = new Schema({
  channel: String,
  active: { type: Boolean, default: false },
  message: { type: String, default: Constants.DEFAULTS.LEAVE_WELCOME_MESSAGE },
});

const InputWelcomeSchema = new Schema({
  channel: String,
  active: { type: Boolean, default: false },
  message: { type: String, default: Constants.DEFAULTS.INPUT_WELCOME_MESSAGE },
});

const PrivateWelcomeSchema = new Schema({
  active: { type: Boolean, default: false },
  message: {
    type: String,
    default: Constants.DEFAULTS.PRIVATE_WELCOME_MESSAGE,
  },
});

const WelcomeSchema = new Schema({
  leave: LeaveWelcomeSchema,
  input: InputWelcomeSchema,
  private: PrivateWelcomeSchema,
});

module.exports = {
  nivel: NivelSchema,
  count: CountSchema,
  social: SocialSchema,
  vanity: VanitySchema,
  freeze: FreezeSchema,
  welcome: WelcomeSchema,
  suggestion: SuggestionSchema,
  harrypotter: HarryPotterSchema,
  _id: { type: String, required: true },
  prefix: { type: String, default: Constants.DEFAULTS.PREFIX },
  language: { type: String, default: Constants.DEFAULTS.LANGUAGE },
};
