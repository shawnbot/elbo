var xsor = require('xsor');
var privates = require('privates');

const REFLECTING = 'reflecting__';

var boilerplate = function(config) {
  var base = HTMLElement;

  // this is the object we'll return
  var props = {};

  // this is where methods and property accessors go
  var extensions = {};

  var ext = config['extends'];
  if (typeof ext === 'string') {
    base = document.createElement(ext).constructor;
    props['extends'] = ext;
  }

  var lifecycle = config.lifecycle || {};

  var methods = config.methods;
  if (methods) {
    for (var method in methods) {
      extensions[method] = {value: methods[method]};
    }
  }

  var properties = config.properties;
  if (properties) {
    var reflections = {};
    for (var name in properties) {
      var prop = properties[name];
      var descriptor = xsor(prop);
      extensions[name] = descriptor;
      if (prop.reflect) {
        reflections[name] = prop.reflect === true ? name : prop.reflect;
        descriptor.set = propertyReflector(reflections[name], descriptor.set);
      }
    }

    lifecycle.attributeChanged = attributeReflector(reflections, lifecycle.attributeChanged);
  }

  props.prototype = Object.create(
    base.prototype,
    extensions
  );

  return spec;
};

var attributeReflector = function(reflections, callback) {
  var key = REFLECTING + attr;
  return function(attr, previous, value) {
    if (attr in reflections) {
      if (!privates.get(this, key)) {
        privates.set(this, key, true);
        this[reflections[attr]] = value;
        privates.set(this, key, false);
      }
    }
    return callback
      ? callback.apply(this, arguments)
      : undefined;
  };
};

var propertyReflector = function(attr, set) {
  var key = REFLECTING + attr;
  return function(value) {
    if (!privates.get(this, key)) {
      privates.set(this, key, true);
      this.setAttribute(attr, value);
      privates.set(this, key, false);
    }
    return set.apply(this, value);
  };
};

boilerplate.register = function(name, config) {
  return document.registerElement(name, boilerplate(config));
};

module.exports = boilerplate;
