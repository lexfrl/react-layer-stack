'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.reducer = exports.LayerStackProvider = exports.LayerToggle = exports.Layer = exports.LayerStackMountPoint = exports.DEFAULT_STORE_KEY = undefined;var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _components = require('./components');
var _redux = require('redux');
var _reactRedux = require('react-redux');
var _reducer = require('./reducer');var _reducer2 = _interopRequireDefault(_reducer);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var DEFAULT_STORE_KEY = exports.DEFAULT_STORE_KEY = 'layer_stack'; // should be used in combineReducers

var LayerStackMountPoint = (0, _components.LayerStackMountPoint)(DEFAULT_STORE_KEY); // this allows you to specify the key or "namespace" in your store
var Layer = (0, _components.Layer)(DEFAULT_STORE_KEY);
var LayerToggle = (0, _components.LayerToggle)(DEFAULT_STORE_KEY);

var configuredReducer = (0, _redux.combineReducers)(_defineProperty({}, DEFAULT_STORE_KEY, _reducer2.default));
var store = (0, _redux.createStore)(configuredReducer);var

LayerStackProvider = function (_Component) {_inherits(LayerStackProvider, _Component);function LayerStackProvider() {_classCallCheck(this, LayerStackProvider);return _possibleConstructorReturn(this, (LayerStackProvider.__proto__ || Object.getPrototypeOf(LayerStackProvider)).apply(this, arguments));}_createClass(LayerStackProvider, [{ key: 'render', value: function render()
    {
      return _react2.default.createElement(_reactRedux.Provider, _extends({ store: store }, this.props), this.props.children);
    } }]);return LayerStackProvider;}(_react.Component);exports.


LayerStackMountPoint = LayerStackMountPoint;exports.Layer = Layer;exports.LayerToggle = LayerToggle;exports.LayerStackProvider = LayerStackProvider;exports.reducer = _reducer2.default;
//# sourceMappingURL=index.js.map