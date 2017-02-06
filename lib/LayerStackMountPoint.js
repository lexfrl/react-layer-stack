'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _LayerMountPoint = require('./LayerMountPoint');var _LayerMountPoint2 = _interopRequireDefault(_LayerMountPoint);
var _LayerStore = require('./LayerStore');var _LayerStore2 = _interopRequireDefault(_LayerStore);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var

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

    {var _this2 = this;var _props =
      this.props;var mountPointId = _props.id;var elementType = _props.elementType;var
      layerStore = this.layerStore;
      var stack = this.layerStore.getStack();
      return (0, _react.createElement)(elementType, {}, stack.
      filter(function (id) {return _this2.layerStore.getLayer(id).mountPointId === mountPointId;}).
      map(function (id, index) {return (0, _react.createElement)(elementType, { key: id },
        (0, _react.createElement)(_LayerMountPoint2.default, { id: id, index: layerStore.getIndex(id) }));}));
    } }]);return LayerStackMountPoint;}(_react.Component);exports.default = LayerStackMountPoint;


LayerStackMountPoint.contextTypes = {
  layerStore: _react.PropTypes.object };


LayerStackMountPoint.defaultProps = {
  elementType: 'span' };
//# sourceMappingURL=LayerStackMountPoint.js.map