'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _LayerStore = require('./LayerStore');var _LayerStore2 = _interopRequireDefault(_LayerStore);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var



LayerMountPoint = function (_Component) {_inherits(LayerMountPoint, _Component);




  function LayerMountPoint(props, context) {_classCallCheck(this, LayerMountPoint);var _this = _possibleConstructorReturn(this, (LayerMountPoint.__proto__ || Object.getPrototypeOf(LayerMountPoint)).call(this,
    props, context));
    _this.unsubscribe = null;
    _this.layerStore = context.layerStore;return _this;
  }_createClass(LayerMountPoint, [{ key: 'shouldComponentUpdate', value: function shouldComponentUpdate(

    props, state) {
      return true;
    } }, { key: 'componentWillMount', value: function componentWillMount()

    {var _this2 = this;
      this.unsubscribe = this.layerStore.subscribeToLayer(this.props.id, function () {
        _this2.setState({});
      });
    } }, { key: 'componentWillUnmount', value: function componentWillUnmount()

    {
      this.unsubscribe();
      this.unsubscribe = null;
      this.layerStore = null;
    } }, { key: 'render', value: function render()

    {var _props =
      this.props;var id = _props.id;var index = _props.index;var _layerStore =
      this.layerStore;var _show = _layerStore.show;var _hide = _layerStore.hide;var _update = _layerStore.update;var isActive = _layerStore.isActive;
      var stack = this.layerStore.getStack();
      var layer = this.layerStore.getLayer(id);
      return isActive(id) ? layer.layerFn.apply(layer, [{
        index: index, id: id, stack: stack, // seems like there is no valid use-case mountPointId in the Layer render function
        hide: function hide() {return _hide(id);}, // intention here is to hide ID's management from Layer and let app developer manage these IDs independently
        // which will give an ability to write general-purpose Layers and share them b/w projects
        show: function show() {for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return _show(id, args);}, // sometimes you may want to change args of the current layer
        update: function update() {for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {args[_key2] = arguments[_key2];}return _update(id, args);} }].concat(_toConsumableArray(
      layer.args))) : null;
    } }]);return LayerMountPoint;}(_react.Component);exports.default = LayerMountPoint;


LayerMountPoint.contextTypes = {
  layerStore: _react.PropTypes.object };


LayerMountPoint.defaultProps = {
  index: 0 };
//# sourceMappingURL=LayerMountPoint.js.map