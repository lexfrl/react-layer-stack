'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

LayerStoreCore = function () {



  function LayerStoreCore() {_classCallCheck(this, LayerStoreCore);
    this.store = {
      stack: [],
      layers: {} };


    this.getLayer = this.getLayer.bind(this);
    this.getStack = this.getStack.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.update = this.update.bind(this);
    this.register = this.register.bind(this);
    this.updateFn = this.updateFn.bind(this);
    this.unregister = this.unregister.bind(this);
    this.isActive = this.isActive.bind(this);
    this.getIndex = this.getIndex.bind(this);
    this.getLayersForMountPoint = this.getLayersForMountPoint.bind(this);
    this.getActiveLayersForMountPoint = this.getActiveLayersForMountPoint.bind(this);
  }_createClass(LayerStoreCore, [{ key: 'getLayer', value: function getLayer(

    id) {
      return this.store.layers[id];
    } }, { key: 'getLayersForMountPoint', value: function getLayersForMountPoint(

    mountPointId) {var
      layers = this.store.layers;
      return Object.keys(layers).filter(function (id) {return layers[id].mountPointId === mountPointId;});
    } }, { key: 'getActiveLayersForMountPoint', value: function getActiveLayersForMountPoint(

    mountPointId) {var
      layers = this.store.layers;
      return Object.keys(layers).filter(function (id) {return layers[id].mountPointId === mountPointId && layers[id].isActive;});
    } }, { key: 'getStack', value: function getStack()

    {
      return this.store.stack;
    } }, { key: 'register', value: function register(

    id, layerFn)

    {var mountPointId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;var groups = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var use = arguments[4];var defaultArgs = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];var defaultShow = arguments[6];
      this.store.layers[id] = { layerFn: layerFn, groups: groups, mountPointId: mountPointId, defaultArgs: defaultArgs, defaultShow: defaultShow, use: use };
      this.reset(id);
    } }, { key: 'updateFn', value: function updateFn(

    id, layerFn)

    {var mountPointId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;var groups = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var use = arguments[4];var defaultArgs = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];var defaultShow = arguments[6];
      var layer = this.getLayer(id);
      layer.fn = layerFn;
      layer.use = use;
      layer.mountPointId = mountPointId;
      layer.groups = groups;
      layer.defaultArgs = defaultArgs;
      layer.defaultShow = defaultShow;
    } }, { key: 'reset', value: function reset(

    id) {
      var layer = this.store.layers[id];
      layer.args = layer.defaultArgs;
      if (layer.defaultShow) {
        this.show(id);
      }
    } }, { key: 'unregister', value: function unregister(

    id) {
      delete this.store.layers[id];
    } }, { key: 'update', value: function update(

    id) {var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      if (args.length) {
        this.store.layers[id].args = args;
      } else {
        this.store.layers[id].args = this.store.layers[id].defaultArgs;
      }
    } }, { key: 'show', value: function show(

    id, args) {var
      stack = this.store.stack;
      this.update(id, args);
      if (id !== stack[stack.length - 1]) {
        this.hide(id);
        this.store.stack = [].concat(_toConsumableArray(stack), [id]);
      }
    } }, { key: 'hide', value: function hide(

    id) {
      var stack = [].concat(_toConsumableArray(this.store.stack));
      if (-1 !== stack.indexOf(id)) {
        stack.splice(stack.indexOf(id), 1);
        this.store.stack = stack;
      }
    } }, { key: 'getIndex', value: function getIndex(

    id) {
      return this.store.stack.indexOf(id);
    } }, { key: 'isActive', value: function isActive(

    id) {
      return this.store.stack.indexOf(id) !== -1;
    } }]);return LayerStoreCore;}();exports.default = LayerStoreCore;
//# sourceMappingURL=LayerStoreCore.js.map