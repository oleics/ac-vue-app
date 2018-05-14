
var quote = require('shell-quote').quote;

function optsToShell(obj) {
  var args = [],
      value;
  Object.keys(obj).forEach(function (key) {
    var value = obj[key];
    if (value === false || value == null) return;
    args.push('--' + key);
    if (value !== true) {
      args.push(quote([value]));
    }
  });
  return args;
}

module.exports = {
  optsToShell: optsToShell
};