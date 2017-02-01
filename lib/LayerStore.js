'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

LayerStore = function () {

  function LayerStore() {_classCallCheck(this, LayerStore);
    this.store = {
      displaying: [],
      layers: {} };

    this._mountPointsubscriptions = {};
    this._layerSubscriptions = {};
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.register = this.register.bind(this);
    this.updateFn = this.updateFn.bind(this);
    this.unregister = this.unregister.bind(this);
  }_createClass(LayerStore, [{ key: 'register', value: function register(

    id, layerFn) {var mountPointId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;var groups = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var defaultArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
      this.store.layers[id] = { layerFn: layerFn, groups: groups, mountPointId: mountPointId, args: defaultArgs, defaultArgs: defaultArgs };
    } }, { key: 'updateFn', value: function updateFn(

    id, layerFn) {
      this.store.layers[id].fn = layerFn;
    } }, { key: 'unregister', value: function unregister(

    id) {
      delete this.store.layers[id];
    } }, { key: 'setArgs', value: function setArgs(

    id) {var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      if (args.length) {
        this.store.layers[id].args = args;
      } else {
        this.store.layers[id].args = this.store.layers[id].defaultArgs;
      }
    } }, { key: 'show', value: function show(

    id, args) {
      this.setArgs(id, args);
      this.hide(id);
      this.store.displaying.push(id);
    } }, { key: 'hide', value: function hide(

    id) {var
      displaying = this.store.displaying;
      if (-1 !== displaying.indexOf(id)) {
        displaying.splice(displaying.indexOf(id), 1);
      }
    } }, { key: 'subscribeToLayer', value: function subscribeToLayer(

    id, fn) {var _this = this;
      this._layerSubscriptions[id] = fn;
      return function () {
        delete _this._layerSubscriptions[id];
      };
    } }, { key: 'notifyLayer', value: function notifyLayer(

    id, fn) {
      if (this._layerSubscriptions[id]) {
        this._layerSubscriptions[id]();
      }
    } }, { key: 'subscribeToMountPoint', value: function subscribeToMountPoint(

    id, fn) {var _this2 = this;
      this._mountPointsubscriptions[id] = fn;
      return function () {
        delete _this2._mountPointsubscriptions[id];
      };
    } }, { key: 'notifyMountPoint', value: function notifyMountPoint(

    mountPointId) {
      if (this._mountPointsubscriptions[mountPointId]) {
        this._mountPointsubscriptions[mountPointId]();
      }
    } }]);return LayerStore;}();exports.default = LayerStore;
//# sourceMappingURL=LayerStore.js.map