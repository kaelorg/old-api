/** @type {typeof import('adonis-mongoose-model/src/Model/Base')} */
const DefaultBaseModel = use('MongooseModel');

const { Document, model: applyModel } = require('mongoose');

const Util = require('../../src/utils/Util');

class BaseModel extends DefaultBaseModel {
  constructor(model) {
    super();

    this.model = model;
    this.parse = this.parse.bind(this);
  }

  get defaultValue() {
    return {};
  }

  /**
   * Parse the document object
   */
  parse(entity) {
    return Util.mergeDefault(
      this.defaultValue,
      entity instanceof Document ? entity.toObject({ versionKey: false }) : {},
    );
  }

  /**
   * Force insert new document in schema
   */
  _add(entity) {
    return this.model.create(entity);
  }

  // Queries

  get(id) {
    return this.findById(id, false)
      .then(document => document || this._add({ _id: id }))
      .then(this.parse);
  }

  findById(id, getObject = true) {
    if (getObject) return { exec: () => this.findOne(id) };
    return this.findOne(id);
  }

  findAll(filter, projection = '', options = {}) {
    return this.model
      .find(filter, projection, options)
      .then(docs => docs.map(this.parse));
  }

  findOne(conditions, projection = '', options = {}) {
    return this.model
      .findOne(Util.transformMany(conditions), projection, options)
      .then(this.parse);
  }

  remove(conditions, options = {}) {
    return this.model.deleteOne(Util.transformMany(conditions), options);
  }

  update(filter, doc = {}, options = { upsert: true }) {
    return this.model.updateOne(Util.transformMany(filter), doc, options);
  }

  /**
   * Build Schema
   */
  static buildModel(schemaName, options = {}) {
    return new this(applyModel(schemaName, super.buildSchema(options)));
  }
}

module.exports = BaseModel;
