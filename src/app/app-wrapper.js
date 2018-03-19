
var Vue = require('ac-sr')(require('vue'));

Vue.component('action', require('ac-sr')(require('./components/action/action.vue')));
// Vue.component('app', require('ac-sr')(require('__app__')));
Vue.component('app', require('ac-sr')(require('./app-package.js')));

module.exports = {
  name: 'app-wrapper',
  render: function(h) {
    return (
      <div id="app">
        <action>
          <app></app>
        </action>
      </div>
    )
  }
};
