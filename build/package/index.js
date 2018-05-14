
// test comment too

module.exports = {
  SSR: require('ac-sr')(require('./app/components/app.vue')),
  AppWrapper: require('ac-sr')(require('./app/app-wrapper')),
  Action: require('ac-sr')(require('./app/components/action/action.vue'))
};