'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _react = require('react');var _react2 = _interopRequireDefault(_react);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var

LayerStackMountPoint = function (_Component) {_inherits(LayerStackMountPoint, _Component);

  function LayerStackMountPoint(props, context) {_classCallCheck(this, LayerStackMountPoint);var _this = _possibleConstructorReturn(this, (LayerStackMountPoint.__proto__ || Object.getPrototypeOf(LayerStackMountPoint)).call(this,
    props, context));
    _this.unsubscribe = context.layerStore.subscribeToMountPoint(props.id, function () {
      _this.setState({});
    });
    _this.layerStore = context.layerStore;return _this;
  }_createClass(LayerStackMountPoint, [{ key: 'componentWillUnmount', value: function componentWillUnmount()

    {
      this.unsubscribe();
      this.unsubscribe = null;
      this.layerStore = null;
    } }, { key: 'render', value: function render()

    {var _props =
      this.props;var mountPointId = _props.id;var elementType = _props.elementType;var mountPointArgs = _props.mountPointArgs;var fn = _props.children;var _layerStore =
      this.layerStore;var _show = _layerStore.show;var _hide = _layerStore.hide;var _layerStore$store =
      this.layerStore.store;var layers = _layerStore$store.layers;var displaying = _layerStore$store.displaying;
      return (0, _react.createElement)(elementType, {}, fn ? fn({ layers: layers, displaying: displaying, show: _show, hide: _hide, mountPointId: mountPointId, mountPointArgs: mountPointArgs }) // it's possible to provide alternative layerFn for the MountPoint
      : displaying.map(function (id, index) {return (// if no alternative layerFn provided we'll use the default one
          (0, _react.createElement)(elementType, { key: id }, function () {
            var layer = layers[id];
            if (layer && layer.layerFn && layer.mountPointId === mountPointId) {
              return layer.layerFn.apply(layer, [{
                index: index, id: id, displaying: displaying, layers: layers, mountPointArgs: mountPointArgs, // seems like there is no valid use-case mountPointId in the Layer render function
                hide: function hide() {return _hide(id);}, // intention here is to hide ID's management from Layer and let app developer manage these IDs independently
                // which will give an ability to write general-purpose Layers and share them b/w projects
                show: function show() {for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return _show.apply(undefined, [id].concat(args));} // sometimes you may want to change args of the current layer
              }].concat(_toConsumableArray(layer.args)));
            }
            if (typeof layer === 'undefined' || typeof layer.layerFn === 'undefined') {
              throw new Error('\n    It seems like you\'re using LayerToggle with id="' +
              id + '" but corresponding Layer isn\'t declared in the current Components tree.\n    Make sure that Layer with id="' +
              id + '" is rendered into the current tree.\n    ');


            }
          }()));}));
    } }]);return LayerStackMountPoint;}(_react.Component);exports.default = LayerStackMountPoint;


LayerStackMountPoint.contextTypes = {
  layerStore: _react.PropTypes.object };


LayerStackMountPoint.defaultProps = {
  elementType: 'span' };
//# sourceMappingURL=LayerStackMountPoint.js.map