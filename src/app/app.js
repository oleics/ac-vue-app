
var Vue = require('ac-sr')(require('vue'));
Vue.use(require('vue-async-computed'));

var AppWrapper = require('./app-wrapper');

// interface

module.exports = createApp;

function createApp() {
  return new Vue({
    data: function data() {
      return {
        context: {}
      };
    },

    render: function render(createElement) {
      return createElement(AppWrapper);
    },

    updated: function updated() {},

    mounted: function mounted() {
      this.$children.forEach(function (child) {
        child.setContext && child.setContext(this.context);
      }, this);
    }
  });
}
