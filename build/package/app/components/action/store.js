
var KEY = 'store';

var dottie = require('dottie');

var localStorage = typeof window === 'undefined' ? null : window.localStorage;
if (!localStorage) {
  console.log('Mocking localStorage-api');
  localStorage = {
    getItem: function getItem(key) {},
    setItem: function setItem(key, value) {},
    removeItem: function removeItem(key) {}
  };
}

module.exports = Store;

function Store() {
  this.storageKey = KEY;
  this.data = {};
  this.load();
}

Store.prototype.load = function () {
  if (this._loaded) return Promise.resolve(this.data);
  var self = this;
  return new Promise(function (resolve, reject) {
    console.log('store.load');
    self.data = JSON.parse(localStorage.getItem(self.storageKey) || '{}') || {};
    resolve(self.data);
  });
};

Store.prototype.save = function () {
  var self = this;
  return new Promise(function (resolve, reject) {
    console.log('store.save');
    localStorage.setItem(self.storageKey, JSON.stringify(self.data));
    resolve();
  });
};

//

Store.prototype.get = function (key) {
  var self = this;
  return this.load().then(function (data) {
    console.log('store.get', key, data);
    return dottie.get(data, key);
  });
};

Store.prototype.set = function (key, data) {
  var self = this;
  return this.load().then(function () {
    dottie.set(self.data, key, data, {
      force: true // force overwrite defined non-object keys into objects if needed
    });
    return self.save().then(function () {
      console.log('store.set', key, data, self.data);
      return data;
    });
  });
};

Store.prototype.remove = function (key) {
  var self = this;
  return this.load().then(function () {
    console.log('store.remove', key, self.data);
    dottie.set(self.data, key, undefined, {
      force: true // force overwrite defined non-object keys into objects if needed
    });
    return self.save();
  });
};

Store.prototype.getKeys = function (key) {
  var self = this;
  return this.load().then(function () {
    var data = dottie.get(self.data, key);
    data = Object.keys(data || {});
    console.log('store.getKeys', key, data, self.data);
    return data;
  });
};