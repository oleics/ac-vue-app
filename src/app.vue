
<style>
</style>

<template>
  <div>
    <basic-app></basic-app>
  </div>
</template>

<script>

var App = require('ac-sr')(require('./app/components/app.vue'));

module.exports = {
  name: 'default-app',
  components: {
    'basic-app': App
  }
};

</script>
