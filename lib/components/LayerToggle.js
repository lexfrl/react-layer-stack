'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _LayerStore = require('./../LayerStore');var _LayerStore2 = _interopRequireDefault(_LayerStore);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}function _objectWithoutProperties(obj, keys) {var target = {};for (var i in obj) {if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];}return target;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var

LayerToggle = function (_Component) {_inherits(LayerToggle, _Component);



  function LayerToggle(props, context) {_classCallCheck(this, LayerToggle);var _this = _possibleConstructorReturn(this, (LayerToggle.__proto__ || Object.getPrototypeOf(LayerToggle)).call(this,
    props, context));
    _this.unsubscribe = null;
    _this.layerStore = context.layerStore;return _this;
  }_createClass(LayerToggle, [{ key: 'componentWillMount', value: function componentWillMount()

    {var _this2 = this;
      this.unsubscribe = this.layerStore.subscribeToLayer(this.props.for, function () {
        setTimeout(function () {return _this2.setState({});}, 100);
      });
    } }, { key: 'componentWillUnmount', value: function componentWillUnmount()

    {
      this.unsubscribe();
      this.unsubscribe = null;
      this.layerStore = null;
    } }, { key: 'render', value: function render()

    {var _props =
      this.props,children = _props.children,props = _objectWithoutProperties(_props, ['children']);var _layerStore =
      this.layerStore,_show = _layerStore.show,_hide = _layerStore.hide;
      var stack = this.layerStore.getStack();
      return children.apply(undefined, [{
        stack: stack,
        isActive: stack.indexOf(props.for) !== -1,
        show: function show() {for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return props.for ? _show(props.for, args) : _show(args);},
        hide: function hide() {return props.for ? _hide(props.for) : _hide();} }].concat(_toConsumableArray(
      this.layerStore.getLayer(props.for).args)));
    } }]);return LayerToggle;}(_react.Component);exports.default = LayerToggle;


LayerToggle.contextTypes = {
  layerStore: _propTypes2.default.object };
//# sourceMappingURL=LayerToggle.js.map