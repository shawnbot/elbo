// this is the name of your custom element
var name = 'custom-element';

// you can remove this (and references below) if you don't need event
// delegation
var Delegate = require('dom-delegate').Delegate;

// you can remove this if you don't need private variables or event delegation
var privates = require('./privates');

// you can remove this if you don't need to dispatch custom events
var CustomEvent = require('custom-event');

// a handy accessor generator
var property = require('./property');

/**
 * These are you prototype descriptors. You can declare methods here,
 * but if you do you'll need to wrap them in an object literal with a 'value'
 * property:
 *
 * myMethod: {value: function() {
 * }}
 *
 * Otherwise, you can attach methods directly to the `proto` object below:
 *
 * proto.myMethod = function() {
 * };
 *
 * You can declare property accessors with getters and setters like so:
 *
 * property: {
 *   get: function() {
 *   },
 *   set: functio(value) {
 *   }
 * }
 *
 */
var descriptors = {

  /**
   * Set the 'extends' descriptor to the name of an HTML element if you wish to
   * use type extension. This will change the usage of your element from:
   *
   * <custom-element></custom-element>
   *
   * to:
   *
   * <base is="custom-element"></base>
   */
  // 'extends': 'table',

  foo: property('foo', function(value) {
    console.log('foo = ', value);
  }),
};

/**
 * You can also choose to extend a specific HTML element class here.
 *
 * NOTE: If you've set the 'extends' descriptor above, the base class is
 * determined dynamically, so this is ignored.
 */
var base = HTMLElement;

var extend = require('./extend');
var proto = extend(base, descriptors);

/**
 * This function is called when your element is created,
 * via either the constructor or document.createElement().
 */
proto.createdCallback = function() {
};

/**
 * This function is called when your element is attached to the document,
 * either directly or when one of its ancestors is appended.
 */
proto.attachedCallback = function() {
  var delegate = new Delegate(this);
  privates.set(this, 'delegate', delegate);
  /**
   * Add your delegated event listeners here, e.g.
   *
   * delegate.on('click', 'button', onButtonClick);
   *
   * These will be remove automatically in the detachedCallback.
   */
};

/**
 * This function is called whenever one of your element instance's attributes
 * is changed via `setAttribute()`.
 *
 * @param {String} name       the local attribute name (no namespace)
 * @param {String} previous   the previous attribute value, or `null`
 * @param {String} value      the new attribute value, or `null` if removed
 */
proto.attributeChangedCallback = function(name, previous, value) {
};

/**
 * This is called when your element is detached from the document root,
 * either direct removal or removal of one of its ancestors.
 */
proto.detachedCallback = function() {
  var delegate = privates.get(this, 'delegate');
  delegate.off();
  privates.delete(this);
};

module.exports = document.registerElement(name, proto);
