'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _common = require('./../common');
var _LayerStore = require('./../LayerStore');var _LayerStore2 = _interopRequireDefault(_LayerStore);
var _LayerMountPoint = require('./LayerMountPoint');var _LayerMountPoint2 = _interopRequireDefault(_LayerMountPoint);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var

Layer = function (_Component) {_inherits(Layer, _Component);



  function Layer(props, context) {_classCallCheck(this, Layer);var _this = _possibleConstructorReturn(this, (Layer.__proto__ || Object.getPrototypeOf(Layer)).call(this,
    props, context));
    _this.layerStore = context.layerStore;return _this;
  }_createClass(Layer, [{ key: 'componentWillMount', value: function componentWillMount()

    {var
      layerStore = this.context.layerStore;var _props =
      this.props,id = _props.id,children = _props.children,to = _props.to,use = _props.use,defaultArgs = _props.defaultArgs,defaultShow = _props.defaultShow;
      layerStore.register(id, children, to, null, use, defaultArgs, defaultShow);
    } }, { key: 'shouldComponentUpdate', value: function shouldComponentUpdate(

    newProps) {var _props2 =
      this.props,children = _props2.children,id = _props2.id,to = _props2.to,use = _props2.use;var
      layerStore = this.context.layerStore;
      var needUpdate = false;
      if (id !== newProps.id || to !== newProps.to) {
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
            if ((0, _common.isPrimitiveType)(use[i]) && (0, _common.isPrimitiveType)(newProps.use[i])) {
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
        layerStore.updateFn(newProps.id, newProps.children, newProps.to, null, newProps.use, newProps.defaultArgs, newProps.defaultShow);
        return true;
      }
      return false;
    } }, { key: 'componentWillUnmount', value: function componentWillUnmount()

    {
      this.layerStore = null;
    } }, { key: 'render', value: function render()

    {var _props3 =
      this.props,id = _props3.id,to = _props3.to,elementType = _props3.elementType;
      if (!to) {
        return (0, _react.createElement)(_LayerMountPoint2.default, { id: id });
      }
      return null;
    } }]);return Layer;}(_react.Component);exports.default = Layer;


Layer.propTypes = {
  use: _propTypes2.default.array };


Layer.defaultProps = {
  elementType: 'span' };


Layer.contextTypes = {
  layerStore: _propTypes2.default.object };
//# sourceMappingURL=Layer.js.map