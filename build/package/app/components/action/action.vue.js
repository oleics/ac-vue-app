;(function(){


var Aj = require('ac-aj');
var Store = require('./store');

module.exports = {
  name: 'action',

  data: function data() {
    return {
      action: new Aj(),
      store: new Store(),
      lastEvent: {
        name: null,
        data: null
      }
    };
  },

  provide: function provide() {
    var api = {},
        self = this;
    Object.defineProperty(api, 'action', {
      enumerable: true,
      get: function get() {
        return self.action;
      }
    });
    Object.defineProperty(api, 'store', {
      enumerable: true,
      get: function get() {
        return self.store;
      }
    });
    return api;
  },

  methods: {
    onAny: function onAny(eventName, data) {
      this.lastEvent.name = eventName;
      this.lastEvent.data = data;
    }
  },

  created: function created() {
    this.onAny = this.onAny.bind(this);
    this.action.onAny(this.onAny);
  },

  beforeDestroy: function beforeDestroy() {
    this.action.offAny(this.onAny);
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._l((_vm.action.availableActions()),function(a){return _c('span',[_vm._v("\n    "+_vm._s(a)+"\n  ")])}),_vm._v(" "),(_vm.lastEvent.name)?_c('div',[_vm._v("\n    "+_vm._s(_vm.lastEvent.name)+"\n    "+_vm._s(_vm.lastEvent.data)+"\n  ")]):_vm._e(),_vm._v(" "),_vm._t("default")],2)}
__vue__options__.staticRenderFns = []

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbi52dWU/NGRjZjk4NGYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBbUJBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSEE7QUFRQTs7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTs7QUFPQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUE3Q0E7Ozs7QUFsQkE7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbIlxuPHN0eWxlPlxuPC9zdHlsZT5cblxuPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxzcGFuIHYtZm9yPVwiYSBpbiBhY3Rpb24uYXZhaWxhYmxlQWN0aW9ucygpXCI+XG4gICAgICB7e2F9fVxuICAgIDwvc3Bhbj5cbiAgICA8ZGl2IHYtaWY9XCJsYXN0RXZlbnQubmFtZVwiPlxuICAgICAge3tsYXN0RXZlbnQubmFtZX19XG4gICAgICB7e2xhc3RFdmVudC5kYXRhfX1cbiAgICA8L2Rpdj5cbiAgICA8c2xvdD48L3Nsb3Q+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cblxudmFyIEFqID0gcmVxdWlyZSgnYWMtYWonKTtcbnZhciBTdG9yZSA9IHJlcXVpcmUoJy4vc3RvcmUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG5hbWU6ICdhY3Rpb24nLFxuXG4gIGRhdGE6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhY3Rpb246IG5ldyBBaigpLFxuICAgICAgc3RvcmU6IG5ldyBTdG9yZSgpLFxuICAgICAgbGFzdEV2ZW50OiB7XG4gICAgICAgIG5hbWU6IG51bGwsXG4gICAgICAgIGRhdGE6IG51bGwsXG4gICAgICB9LFxuICAgIH07XG4gIH0sXG5cbiAgcHJvdmlkZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFwaSA9IHt9LCBzZWxmID0gdGhpcztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYXBpLCAnYWN0aW9uJywge1xuICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgIHJldHVybiBzZWxmLmFjdGlvbjtcbiAgICAgICB9XG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGFwaSwgJ3N0b3JlJywge1xuICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgIHJldHVybiBzZWxmLnN0b3JlO1xuICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gYXBpO1xuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBvbkFueTogZnVuY3Rpb24oZXZlbnROYW1lLCBkYXRhKXtcbiAgICAgIHRoaXMubGFzdEV2ZW50Lm5hbWUgPSBldmVudE5hbWU7XG4gICAgICB0aGlzLmxhc3RFdmVudC5kYXRhID0gZGF0YTtcbiAgICB9XG4gIH0sXG5cbiAgY3JlYXRlZDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5vbkFueSA9IHRoaXMub25BbnkuYmluZCh0aGlzKTtcbiAgICB0aGlzLmFjdGlvbi5vbkFueSh0aGlzLm9uQW55KTtcbiAgfSxcblxuICBiZWZvcmVEZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmFjdGlvbi5vZmZBbnkodGhpcy5vbkFueSk7XG4gIH0sXG59O1xuXG48L3NjcmlwdD5cbiJdfQ==