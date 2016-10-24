'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.LayerContext = exports.Layer = exports.LayerStackMountPoint = undefined;var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _reactRedux = require('react-redux');
var _redux = require('redux');

var _reducer = require('./reducer');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}

var LayerStackMountPoint = exports.LayerStackMountPoint = function LayerStackMountPoint() {var namespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'layer_stack';return (0, _reactRedux.connect)(
  function (store) {return store[namespace];},
  function (dispatch) {return (0, _redux.bindActionCreators)(_reducer.ACTIONS, dispatch);})(
  function (_ref) {var renderFn = _ref.renderFn;var views = _ref.views;var displaying = _ref.displaying;var show = _ref.show;var hide = _ref.hide;var hideAll = _ref.hideAll; // from store
    return (
      _react2.default.createElement('div', null, ' ', renderFn ? renderFn({ views: views, displaying: displaying, show: show, hide: hide, hideAll: hideAll }) :
        displaying.length ? displaying.map(
        function (id, index) {return (
            _react2.default.createElement('div', { key: id },
              function () {
                if (views[id] && views[id].renderFn) {var _views$id;
                  return (_views$id = views[id]).renderFn.apply(_views$id, [{ // TODO: check that renderFn is a function
                    index: index, id: id, show: show, hide: hide, hideAll: hideAll, displaying: displaying, views: views,
                    showOnlyMe: function showOnlyMe() {for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return hideAll() || show.apply(undefined, [id].concat(args));}, // TODO: improve
                    hideMe: function hideMe() {return hide(id);},
                    showMe: function showMe() {for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {args[_key2] = arguments[_key2];}return show.apply(undefined, [id].concat(args));} // sometimes you may want to change args of the current layer
                  }].concat(_toConsumableArray(views[id].args)));
                }
                if (typeof views[id] === 'undefined' || typeof views[id].renderFn === 'undefined') {
                  throw new Error('\nIt seems like you\'re using LayerContext with id="' +
                  id + '" but corresponding Layer isn\'t declared in the current Components tree.\nMake sure that Layer with id="' +
                  id + '" is rendered into the current tree.\n');

                }
              }()));}) :


        _react2.default.createElement('noscript', null)));


  });};

var Layer = exports.Layer = function Layer() {var namespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'layer_stack';return (0, _reactRedux.connect)(
  function (store) {return store[namespace];},
  function (dispatch) {return (0, _redux.bindActionCreators)(_reducer.ACTIONS, dispatch);})(
  _react2.default.createClass({
    componentWillMount: function componentWillMount() {
      this.props.register(this.props.id, this.props.children);
      if (this.props.showInitially) {
        this.props.show(this.props.id, this.props.defaultArgs || []);
      }
    },
    shouldComponentUpdate: function shouldComponentUpdate(newProps) {var _props =
      this.props;var use = _props.use;var children = _props.children;var register = _props.register;var id = _props.id;
      var needUpdate = false;
      if (id !== newProps.id) {
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
            if (JSON.stringify(use[i]) !== JSON.stringify(newProps.use[i])) {
              needUpdate = true;
            }
          }
        }
      }

      if (needUpdate) {
        register(newProps.id, newProps.children);
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


var LayerContext = exports.LayerContext = function LayerContext() {var namespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'layer_stack';return (0, _reactRedux.connect)(
  function (store) {return store[namespace];},
  function (dispatch) {return (0, _redux.bindActionCreators)(_reducer.ACTIONS, dispatch);})(
  function (_ref2)

  {var children = _ref2.children;var id = _ref2.id;var displaying = _ref2.displaying;var show = _ref2.show;var hide = _ref2.hide;var hideAll = _ref2.hideAll;var views = _ref2.views;
    return children({
      show: show, hide: hide, hideAll: hideAll, displaying: displaying, views: views,
      isActive: displaying.indexOf(id) !== -1,
      showMe: function showMe() {for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {args[_key3] = arguments[_key3];}return show.apply(undefined, [id].concat(args));},
      showOnlyMe: function showOnlyMe() {for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}return hideAll() || show.apply(undefined, [id].concat(args));},
      hideMe: function hideMe() {return hide(id);} });

  });};
//# sourceMappingURL=components.js.map