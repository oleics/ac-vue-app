
var Vue = require('ac-sr')(require('vue'));

module.exports = {
  name: 'app-wrapper',
  render: function render(h) {
    return h(
      'div',
      {
        attrs: { id: 'app' }
      },
      [h('action', [h('app', [h('slot')])])]
    );
  }
};