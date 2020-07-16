/* eslint-disable */

class BitField {
  constructor(bits) {
    this.bitfield = this.constructor.resolve(bits);
  }

  freeze() {
    return Object.freeze(this);
  }

  equals(bit) {
    return this.bitfield === this.constructor.resolve(bit);
  }

  any(bit) {
    return (this.bitfield & this.constructor.resolve(bit)) !== 0;
  }

  missing(bits, ...hasParams) {
    if (!Array.isArray(bits)) bits = new this.constructor(bits).toArray(false);
    return bits.filter(p => !this.has(p, ...hasParams));
  }

  has(bit) {
    if (Array.isArray(bit)) return bit.every(p => this.has(p));

    bit = this.constructor.resolve(bit);
    return (this.bitfield & bit) === bit;
  }

  serialize(...hasParams) {
    const serialized = {};

    for (const [flag, bit] of Object.entries(this.constructor.FLAGS)) {
      serialized[flag] = this.has(bit, ...hasParams);
    }

    return serialized;
  }

  add(...bits) {
    let total = 0;
    for (const bit of bits) {
      total |= this.constructor.resolve(bit);
    }

    if (Object.isFrozen(this)) {
      return new this.constructor(this.bitfield | total);
    }

    this.bitfield |= total;
    return this;
  }

  remove(...bits) {
    let total = 0;
    for (const bit of bits) {
      total |= this.constructor.resolve(bit);
    }

    if (Object.isFrozen(this)) {
      return new this.constructor(this.bitfield & ~total);
    }

    this.bitfield &= ~total;
    return this;
  }

  static resolve(bit = 0) {
    if (typeof bit === 'number' && bit >= 0) return bit;
    if (bit instanceof BitField) return bit.bitfield;
    if (Array.isArray(bit)) {
      return bit.map(p => this.resolve(p)).reduce((prev, p) => prev | p, 0);
    }
    if (typeof bit === 'string' && typeof this.FLAGS[bit] !== 'undefined') {
      return this.FLAGS[bit];
    }

    throw new RangeError('BITFIELD_INVALID');
  }
}

BitField.FLAGS = {};

module.exports = BitField;
