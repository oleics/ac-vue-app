
var Vue = require('ac-sr')(require('vue'));
Vue.use(require('vue-async-computed'));

Vue.component('action', require('ac-sr')(require('./components/action/action.vue')));

var App = require('ac-sr')(require('./app-package.js'));
// Vue.component('app', App);

console.log(__pkg_name__, __pkg_version__);
console.log(Object.keys(Vue.options.components));

// var AppWrapper = require('./app-wrapper');

// interface

module.exports = createApp;

function createApp() {
  return new Vue(App);
  // return new Vue({
  //   render: function render(h) {
  //     return h(
  //       'div',
  //       {
  //         attrs: {
  //           id: __pkg_name__
  //         }
  //       },
  //       [
  //         h(
  //           'action',
  //           [
  //             h(
  //               'app',
  //               this.$slots.default
  //             )
  //           ]
  //         )
  //       ]
  //     );
  //     // return h(AppWrapper, this.$slots.default);
  //   }
  // });
}
