var privates = require('./privates');

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
