# elbo

A tiny, friendly HTML [custom **el**ement][custom element] **bo**ilerplate:


```html
<foo-bar>
  <span class="text">click a button</span>
  <button data-text="hi!">say hi</button>
  <button data-text="bye.">say bye</button>
</foo-bar>
```

```js
var elbo = require('elbo');

elbo.register('foo-bar', {
  methods: {
    say: function(text) {
      this.querySelector('.text').textContent = text;
    }
  },
  events: {
    'click:delegate(button)': function(e) {
      this.say(e.target.getAttribute('data-text'));
    }
  }
});
```

[custom element]: http://www.html5rocks.com/en/tutorials/webcomponents/customelements/
