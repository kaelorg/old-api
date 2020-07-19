class Util {
  static capitalize(str) {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  }

  static mergeDefault(def, given) {
    if (!given) return def;

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

  static transformMany(many) {
    if (
      (typeof many.toString === 'function' ? many.toString() : many) ===
      '[object Object]'
    ) {
      return many;
    }

    return { _id: many };
  }

  static transformData(data, popKey) {
    return Object.entries(data)
      .filter(([, value]) => !(typeof value === 'undefined' || value === null))
      .reduce(
        (fullObj, [key, value]) =>
          Object.assign(fullObj, {
            [`${popKey ? `${popKey}.` : ''}${key}`]: value,
          }),
        {},
      );
  }
}

module.exports = Util;
