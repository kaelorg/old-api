class Util {
  static capitalize(str) {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  }

  static transformMany(many) {
    if (
      (typeof many.toString === 'function' ? many.toString() : many) ===
      '[object Object]'
    ) {
      return many;
    }

    return { _id: many };
  }

  static transformManyData(popKey, data = {}) {
    return Object.entries(data).reduce(
      (obj, [key, value]) =>
        Object.assign(obj, { [`${popKey}.${key}`]: value }),
      {},
    );
  }

  static mergeDefault(def, given) {
    if (!given) return def;

    // eslint-disable-next-line no-restricted-syntax
    for (const key in def) {
      if (
        !Object.prototype.hasOwnProperty.call(given, key) ||
        given[key] === undefined
      ) {
        given[key] = def[key];
      } else if (given[key] === Object(given[key])) {
        given[key] = Util.mergeDefault(def[key], given[key]);
      }
    }

    return given;
  }
}

module.exports = Util;
