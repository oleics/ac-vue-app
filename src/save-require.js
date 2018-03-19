
module.exports = function(obj){
  if(obj.default != null) {
    return obj.default;
  }
  return obj;
};
