var WeakMap = require('weakmap');
var privates = new WeakMap();

function _get(element) {
  if (privates.has(element)) {
    return privates.get(element);
  }
  var obj = {};
  privates.set(element, obj);
  return obj;
}

function get(element, key) {
  return _get(element)[key];
}

function set(element, key, value) {
  return _get(element)[key] = value;
}

module.exports = {
  get: get,
  set: set,
  'delete': function(element) {
    return privates.delete(element);
  }
};
