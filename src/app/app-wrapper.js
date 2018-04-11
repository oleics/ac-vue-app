
var Vue = require('ac-sr')(require('vue'));

module.exports = {
  name: 'app-wrapper',
  render: function(h) {
    return (
      <div id="app">
        <action>
          <app>
            <slot></slot>
          </app>
        </action>
      </div>
    )
  }
};
