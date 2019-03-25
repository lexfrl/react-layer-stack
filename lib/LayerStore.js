'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();

var _LayerStoreCore = require('./LayerStoreCore');var _LayerStoreCore2 = _interopRequireDefault(_LayerStoreCore);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

LayerStore = function () {

  function LayerStore() {_classCallCheck(this, LayerStore);
    this._core = new _LayerStoreCore2.default();
    this._layerSubscriptions = {};
    this._mountPointsubscriptions = {};

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.update = this.update.bind(this);
    this.register = this.register.bind(this);
    this.updateFn = this.updateFn.bind(this);
    this.unregister = this.unregister.bind(this);
    this.getLayer = this._core.getLayer;
    this.getStack = this._core.getStack;
    this.getIndex = this._core.getIndex;
    this.isActive = this._core.isActive;
    this.getLayersForMountPoint = this._core.getLayersForMountPoint;
  }_createClass(LayerStore, [{ key: 'subscribeToLayer', value: function subscribeToLayer(

    id, fn) {var _this = this;
      if (typeof this._layerSubscriptions[id] === 'undefined') {
        this._layerSubscriptions[id] = new Set();
      }
      this._layerSubscriptions[id].add(fn);
      return function () {
        return _this._layerSubscriptions[id].delete(fn);
      };
    } }, { key: 'subscribeToMountPoint', value: function subscribeToMountPoint(

    id, fn) {var _this2 = this;
      if (typeof this._mountPointsubscriptions[id] === 'undefined') {
        this._mountPointsubscriptions[id] = new Set();
      }
      this._mountPointsubscriptions[id].add(fn);
      return function () {
        return _this2._mountPointsubscriptions[id].delete(fn);
      };
    } }, { key: 'notifyLayer', value: function notifyLayer(

    id) {
      if (this._layerSubscriptions[id]) {
        this._layerSubscriptions[id].forEach(function (fn) {return fn();});
      }
    } }, { key: 'notifyMountPoint', value: function notifyMountPoint(

    id) {
      if (this._mountPointsubscriptions[id]) {
        this._mountPointsubscriptions[id].forEach(function (fn) {return fn();});
      }
    } }, { key: 'register', value: function register(

    id, layerFn)

    {var mountPointId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;var groups = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var use = arguments[4];var defaultArgs = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];var defaultShow = arguments[6];
      this._core.register(id, layerFn, mountPointId, groups, use, defaultArgs, defaultShow);
      if (mountPointId) {
        this.notifyMountPoint(mountPointId);
      } else {
        this.notifyLayer(id);
      }
    } }, { key: 'updateFn', value: function updateFn(

    id, layerFn)

    {var mountPointId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;var groups = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var use = arguments[4];var defaultArgs = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];var defaultShow = arguments[6];
      var lastMountPoint = this.getLayer(id).mountPointId;
      this._core.updateFn(id, layerFn, mountPointId, groups, use, defaultArgs, defaultShow);
      if (lastMountPoint !== mountPointId) {
        this.notifyMountPoint(lastMountPoint);
        this.notifyMountPoint(mountPointId);
      } else {
        this.notifyLayer(id);
      }
    } }, { key: 'reset', value: function reset(

    id) {
      this._core.reset(id);
      this.notifyLayer(id);
    } }, { key: 'unregister', value: function unregister(

    id) {
      this._core.unregister(id);
    } }, { key: 'show', value: function show(

    id, args) {
      this._core.show(id, args);
      this.notifyLayer(id);
    } }, { key: 'update', value: function update(

    id, args) {
      this._core.update(id, args);
      this.notifyLayer(id);
    } }, { key: 'hide', value: function hide(

    id) {
      var stack = this.getStack();
      this._core.hide(id);
      this.notifyLayer(id);
    } }]);return LayerStore;}();exports.default = LayerStore;
//# sourceMappingURL=LayerStore.js.map