'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.LayerToggle = exports.Layer = exports.LayerStackMountPoint = undefined;var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _reactRedux = require('react-redux');
var _redux = require('redux');

var _reducer = require('./reducer');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}

var LayerStackMountPoint = exports.LayerStackMountPoint = function LayerStackMountPoint() {var namespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'layer_stack';return (0, _reactRedux.connect)(
  function (store) {return store[namespace];},
  function (dispatch) {return (0, _redux.bindActionCreators)(_reducer.ACTIONS, dispatch);})(
  function (_ref)
  {var renderFn = _ref.renderFn;var views = _ref.views;var displaying = _ref.displaying;var show = _ref.show;var hide = _ref.hide;var hideAll = _ref.hideAll;var args = _ref.args; // from redux
    return (
      _react2.default.createElement('div', null, ' ', renderFn ? renderFn({ views: views, displaying: displaying, show: show, hide: hide, hideAll: hideAll, args: args }) :
        displaying.length ? displaying.map(
        function (index) {var _views$index;return _react2.default.createElement('div', { key: index }, (_views$index = views[index]).renderFn.apply(_views$index, [{ index: index, show: show, hide: hide, hideAll: hideAll, displaying: displaying, views: views }].concat(_toConsumableArray(views[index].args))));}) :

        _react2.default.createElement('noscript', null)));


  });};

var Layer = exports.Layer = function Layer() {var namespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'layer_stack';return (0, _reactRedux.connect)(
  function (store) {return store[namespace];},
  function (dispatch) {return (0, _redux.bindActionCreators)(_reducer.ACTIONS, dispatch);})(
  _react2.default.createClass({
    componentWillMount: function componentWillMount() {
      this.props.register(this.props.id, this.props.renderFn);
    },
    shouldComponentUpdate: function shouldComponentUpdate(newProps) {var _props =
      this.props;var use = _props.use;var renderFn = _props.renderFn;var register = _props.register;var id = _props.id;
      var needUpdate = false;
      if (id !== newProps.id) {
        needUpdate = true;
      } else
      if (renderFn.toString() !== newProps.renderFn.toString()) {
        needUpdate = true;
      } else
      if (use) {
        if (use.length !== newProps.use.length) {
          needUpdate = true;
        } else {
          var i = use.length;
          while (i--) {
            if (JSON.stringify(use[i]) !== JSON.stringify(newProps.use[i])) {
              needUpdate = true;
            }
          }
        }
      }

      if (needUpdate) {
        register(newProps.id, newProps.renderFn);
        return true;
      }
      return false;
    },

    componentWillUnmount: function componentWillUnmount() {
      // TODO: garbage collection
      // this.props.unregister(this.props.id)
    },

    render: function render() {
      return _react2.default.createElement('noscript', null);
    } }));};


var LayerToggle = exports.LayerToggle = function LayerToggle() {var namespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'layer_stack';return (0, _reactRedux.connect)(
  function (store) {return store[namespace];},
  function (dispatch) {return (0, _redux.bindActionCreators)(_reducer.ACTIONS, dispatch);})(
  function (_ref2)

  {var renderFn = _ref2.renderFn;var displaying = _ref2.displaying;var show = _ref2.show;var hide = _ref2.hide;var hideAll = _ref2.hideAll;
    return renderFn({ show: show, hide: hide, hideAll: hideAll, displaying: displaying });
  });};
//# sourceMappingURL=components.js.map