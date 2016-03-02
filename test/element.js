var assert = require('assert');

require('../lib/bundle');

describe('element creation', function() {

  var name = 'custom-element';
  var clicked = 0;
  var buttonClicked = 0;

  var CustomElement = elbo.register(name, {
    properties: {
      foo: {
        initial: 'bar',
        reflect: 'data-foo'
      }
    },
    events: {
      'click': function(e) {
        if (e.target.nodeName !== 'BUTTON') {
          clicked++;
        }
      },
      'click:delegate(button)': function(e) {
        buttonClicked++;
      }
    }
  });

  it('works via constructor', function() {
    var el = new CustomElement();
    assert.equal(el.nodeName.toLowerCase(), name);
    assert.equal(el.foo, 'bar');
  });

  it('works via document.createElement()', function() {
    var el = document.createElement(name);
    assert.equal(el.constructor, CustomElement);
    assert.equal(el.foo, 'bar');
  });

  it('reflects properties -> attributes', function() {
    var el = new CustomElement();
    el.foo = 'baz';
    assert.equal(el.getAttribute('data-foo'), 'baz');
  });

  it('reflects attributes -> properties', function() {
    var el = new CustomElement();
    el.setAttribute('data-foo', 'baz');
    assert.equal(el.foo, 'baz');
  });

  it('adds (undelegated) event listeners', function() {
    var el = new CustomElement();
    document.body.appendChild(el);
    el.click();
    assert.equal(clicked, 1);

    el.parentNode.removeChild(el);
    clicked = 0;
  });

  it('adds delegated event listeners', function() {
    var el = new CustomElement();
    var button = document.createElement('button');
    el.appendChild(button);
    document.body.appendChild(el);
    button.click();
    assert.equal(buttonClicked, 1);
    assert.equal(clicked, 0);

    el.parentNode.removeChild(el);
    clicked = buttonClicked = 0;
  });

});
