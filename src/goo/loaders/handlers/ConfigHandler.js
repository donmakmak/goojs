// Generated by CoffeeScript 1.6.2
define([], function() {
  var ConfigHandler;

  return ConfigHandler = (function() {
    function ConfigHandler(world, getConfig, updateObject, options) {
      this.world = world;
      this.getConfig = getConfig;
      this.updateObject = updateObject;
      this.options = options;
    }

    ConfigHandler.handlerClasses = {};

    ConfigHandler.getHandler = function(type) {
      return this.handlerClasses[type];
    };

    ConfigHandler._register = function(type) {
      this._type = type;
      return ConfigHandler.handlerClasses[type] = this;
    };

    ConfigHandler.prototype.update = function(ref, config) {};

    return ConfigHandler;

  })();
});
