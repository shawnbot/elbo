var privates = require('./privates');

/**
 * A helpful property descriptor generator. As in:
 *
 * @example
 * var change = function(value, previous) {
 *   console.log('foo changed from', previous, 'to', value);
 * };
 *
 * Object.defineProperty(proto, 'foo', change);
 *
 * @param {String}    name    The *private* property name. This need not be the
 *                            same as the property's public name.
 * @param {Function}  change  The function to call when the value changes. If
 *                            this function returns `false` the change will be
 *                            canceled.
 * @param {Function?} parse   An optional function to parse or otherwise coerce
 *                            values, e.g. to turn strings into numbers.
 *
 * @return {Object}   returns a property descriptor for use with
 *                    Object.defineProperty()
 */
module.exports = function property(name, change, parse) {
  return {
    get: function() {
      return privates.get(this, name);
    },

    set: function(value) {
      if (parse) {
        value = parse.call(this, value, name);
      }
      var previous = this[name];
      if (value !== previous) {
        var changed = change.call(this, value, previous, name);
        if (changed !== false) {
          privates.set(this, name, value);
        }
      }
    }
  };
};
