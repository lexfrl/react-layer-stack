'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _LayerStore = require('./../LayerStore');var _LayerStore2 = _interopRequireDefault(_LayerStore);
var _LayerMountPoint = require('./LayerMountPoint');var _LayerMountPoint2 = _interopRequireDefault(_LayerMountPoint);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var



Layer = function (_Component) {_inherits(Layer, _Component);









  function Layer(props, context) {_classCallCheck(this, Layer);var _this = _possibleConstructorReturn(this, (Layer.__proto__ || Object.getPrototypeOf(Layer)).call(this,
    props, context));
    _this.layerStore = context.layerStore;return _this;
  }_createClass(Layer, [{ key: 'componentWillMount', value: function componentWillMount()

    {var _props =
      this.props;var id = _props.id;var children = _props.children;var to = _props.to;
      this.layerStore.register(id, children, to, this.props.defaultArgs, this.props.defaultShow);
    } }, { key: 'componentWillUpdate', value: function componentWillUpdate(_ref)

    {var id = _ref.id;var children = _ref.children;var to = _ref.to;var defaultArgs = _ref.defaultArgs;var defaultShow = _ref.defaultShow;
      this.layerStore.updateFn(id, children, to, defaultArgs, defaultShow);
    } }, { key: 'componentWillUnmount', value: function componentWillUnmount()

    {
      this.layerStore = null;
    } }, { key: 'render', value: function render()

    {var _props2 =
      this.props;var id = _props2.id;var to = _props2.to;
      if (!to) {
        return (0, _react.createElement)(_LayerMountPoint2.default, { id: id });
      }
      return null;
    } }]);return Layer;}(_react.Component);exports.default = Layer;


Layer.defaultProps = {
  elementType: 'span' };


Layer.contextTypes = {
  layerStore: _react.PropTypes.object };
//# sourceMappingURL=Layer.js.map