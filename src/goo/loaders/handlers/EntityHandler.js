// Generated by CoffeeScript 1.6.2
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['goo/loaders/handlers/ConfigHandler', 'goo/loaders/handlers/ComponentHandler', 'goo/entities/Entity', 'goo/util/rsvp', 'goo/util/PromiseUtil'], function(ConfigHandler, ComponentHandler, Entity, RSVP, pu) {
  var EntityHandler, _ref;

  return EntityHandler = (function(_super) {
    __extends(EntityHandler, _super);

    function EntityHandler() {
      _ref = EntityHandler.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    EntityHandler._register('entity');

    EntityHandler.prototype._prepare = function(config) {};

    EntityHandler.prototype._create = function(ref) {
      var object;

      object = this.world.createEntity(ref);
      object.ref = ref;
      return object;
    };

    EntityHandler.prototype.update = function(ref, config) {
      var componentConfig, componentName, handler, handlerClass, object, promise, promises, _ref1, _ref2,
        _this = this;

      object = this.world.entityManager.getEntityByName(ref) || this._create(ref);
      promises = [];
      _ref1 = config.components;
      for (componentName in _ref1) {
        componentConfig = _ref1[componentName];
        handlerClass = ComponentHandler.getHandler(componentName);
        if (handlerClass) {
          if ((_ref2 = this._componentHandlers) == null) {
            this._componentHandlers = {};
          }
          handler = this._componentHandlers[componentName];
          if (handler) {
            _.extend(handler, {
              world: this._world,
              getConfig: this.getConfig,
              updateObject: this.updateObject,
              options: _.clone(this.options)
            });
          } else {
            handler = this._componentHandlers[componentName] = new handlerClass(this.world, this.getConfig, this.updateObject, this.options);
          }
          promise = handler.update(object, componentConfig);
          if (!(promise != null ? promise.then : void 0)) {
            console.error("Handler for " + componentName + " did not return promise");
          } else {
            promises.push(promise);
          }
        } else {
          console.warn("No componentHandler for " + componentName);
        }
      }
      if (promises.length) {
        return RSVP.all(promises).then(function(components) {
          return object;
        });
      } else {
        console.error("No promises in " + ref + " ", config);
        return pu.dummyPromise(object);
      }
    };

    return EntityHandler;

  })(ConfigHandler);
});
