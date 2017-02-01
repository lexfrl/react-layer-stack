'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _helpers = require('./helpers');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var

Layer = function (_Component) {_inherits(Layer, _Component);function Layer() {_classCallCheck(this, Layer);return _possibleConstructorReturn(this, (Layer.__proto__ || Object.getPrototypeOf(Layer)).apply(this, arguments));}_createClass(Layer, [{ key: 'componentWillMount', value: function componentWillMount()
    {var
      layerStore = this.context.layerStore;
      layerStore.register(this.props.id, this.props.children, this.props.mountPointId);
      if (this.props.showInitially) {
        layerStore.show(this.props.id, this.props.defaultArgs || []);
      } else {
        layerStore.setArgs(this.props.id, this.props.defaultArgs || []);
      }
    } }, { key: 'shouldComponentUpdate', value: function shouldComponentUpdate(

    newProps) {var _props =
      this.props;var children = _props.children;var id = _props.id;var mountPointId = _props.mountPointId;var use = _props.use;var
      layerStore = this.context.layerStore;
      var needUpdate = false;
      if (id !== newProps.id || mountPointId !== newProps.mountPointId) {
        needUpdate = true;
      } else
      if (children.toString() !== newProps.children.toString()) {
        needUpdate = true;
      } else
      if (use) {
        if (use.length !== newProps.use.length) {
          needUpdate = true;
        } else {
          var i = use.length;
          while (i--) {
            if ((0, _helpers.isPrimitiveType)(use[i]) && (0, _helpers.isPrimitiveType)(newProps.use[i])) {
              if (use[i] !== newProps.use[i]) {
                needUpdate = true;
              }
            } else
            if (typeof use[i].equals === 'function' && typeof newProps.use[i].equals === 'function') {
              if (!use[i].equals(newProps.use[i])) {// fast equality check for immutable-js && mori
                needUpdate = true;
              }
            } else
            if (JSON.stringify(use[i]) !== JSON.stringify(newProps.use[i])) {
              needUpdate = true;
            }
          }
        }
      }

      if (needUpdate) {
        layerStore.updateFn(newProps.id, newProps.children);
        return true;
      }
      return false;
    } }, { key: 'componentWillUnmount', value: function componentWillUnmount()

    {
      // TODO: garbage collection
      // this.props.unregister(this.props.id)
    } }, { key: 'render', value: function render()

    {
      return null;
    } }]);return Layer;}(_react.Component);exports.default = Layer;


Layer.propTypes = {
  use: _react.PropTypes.array };


Layer.contextTypes = {
  layerStore: _react.PropTypes.object };
//# sourceMappingURL=Layer.js.map