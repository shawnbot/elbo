/**
 * Create a new Element prototype that inherits from a named element (string)
 * or constructor reference.
 */
module.exports = function extend(base, descriptors) {
  // if there's an 'extends' property, use that as the base element
  var extend = descriptors['extends'];

  if (typeof extend === 'string') {
    base = extend;
  }

  // if the base is 
  if (typeof base === 'string') {
    base = document.createElement(base).constructor;
  }

  return Object.create(base.prototype, descriptors);
};
