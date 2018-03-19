
<style>
</style>

<template>
  <div>
    <span v-for="a in action.availableActions()">
      {{a}}
    </span>
    <div v-if="lastEvent.name">
      {{lastEvent.name}}
      {{lastEvent.data}}
    </div>
    <slot></slot>
  </div>
</template>

<script>

var Aj = require('ac-aj');
var Store = require('./store');

module.exports = {
  name: 'action',

  data: function() {
    return {
      action: new Aj(),
      store: new Store(),
      lastEvent: {
        name: null,
        data: null,
      },
    };
  },

  provide: function() {
    var api = {}, self = this;
    Object.defineProperty(api, 'action', {
       enumerable: true,
       get: function() {
         return self.action;
       }
    });
    Object.defineProperty(api, 'store', {
       enumerable: true,
       get: function() {
         return self.store;
       }
    });
    return api;
  },

  methods: {
    onAny: function(eventName, data){
      this.lastEvent.name = eventName;
      this.lastEvent.data = data;
    }
  },

  created: function() {
    this.onAny = this.onAny.bind(this);
    this.action.onAny(this.onAny);
  },

  beforeDestroy: function() {
    this.action.offAny(this.onAny);
  },
};

</script>
