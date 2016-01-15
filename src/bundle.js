// include the document.registerElement() polyfill
require('document-register-element');

// make the constructor available as a global variable
window.CustomElement = require('./element');
