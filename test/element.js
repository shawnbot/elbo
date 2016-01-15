var assert = require('assert');
var CustomElement = require('../src/element');
var name = 'custom-element';

describe('element creation', function() {

  it('works via constructor', function() {
    var el = new CustomElement();
    assert.equal(el.nodeName.toLowerCase(), name);
  });

  it('works via document.createElement()', function() {
    var el = document.createElement(name);
    assert.equal(el.constructor, CustomElement);
  });

});

describe('private accessors', function() {

  it('sets and gets privates', function() {
    var el = new CustomElement();
    assert.equal(el.foo, undefined);
    el.foo = 1;
    assert.equal(el.foo, 1);
  });

});
