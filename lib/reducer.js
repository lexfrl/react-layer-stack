'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.ACTIONS = undefined;var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _reduxActions = require('redux-actions');function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _objectWithoutProperties(obj, keys) {var target = {};for (var i in obj) {if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];}return target;}


var ACTIONS = exports.ACTIONS = {
  register: (0, _reduxActions.createAction)('LAYER_STACK_VIEW_REGISTER', function (id, renderFn) {return { id: id, renderFn: renderFn };}),
  unregister: (0, _reduxActions.createAction)('LAYER_STACK_VIEW_UNREGISTER', function (id) {return { id: id };}),
  toggle: (0, _reduxActions.createAction)('LAYER_STACK_VIEW_TOGGLE'),
  show: (0, _reduxActions.createAction)('LAYER_STACK_VIEW_SHOW', function (id) {for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {args[_key - 1] = arguments[_key];}return { id: id, args: args };}),
  hide: (0, _reduxActions.createAction)('LAYER_STACK_VIEW_HIDE'),
  hideAll: (0, _reduxActions.createAction)('LAYER_STACK_VIEW_HIDE_ALL') };exports.default =


(0, _reduxActions.handleActions)({
  'LAYER_STACK_VIEW_REGISTER': function LAYER_STACK_VIEW_REGISTER(_ref, _ref2) {var views = _ref.views;var state = _objectWithoutProperties(_ref, ['views']);var _ref2$payload = _ref2.payload;var id = _ref2$payload.id;var renderFn = _ref2$payload.renderFn;
    views = _extends({}, views, _defineProperty({}, id, { renderFn: renderFn, args: {} }));
    return _extends({}, state, { views: views });
  },
  'LAYER_STACK_VIEW_UNREGISTER': function LAYER_STACK_VIEW_UNREGISTER(_ref3, _ref4) {var views = _ref3.views;var state = _objectWithoutProperties(_ref3, ['views']);var id = _ref4.payload.id;
    delete views[id]; // mutable for better GC
    return _extends({}, state, { views: views });
  },
  'LAYER_STACK_VIEW_SHOW': function LAYER_STACK_VIEW_SHOW(_ref5, _ref6) {var displaying = _ref5.displaying;var views = _ref5.views;var state = _objectWithoutProperties(_ref5, ['displaying', 'views']);var _ref6$payload = _ref6.payload;var id = _ref6$payload.id;var args = _ref6$payload.args;
    var newViews = _extends({}, views);
    var newDisplaying = displaying;
    newViews[id].args = args;
    if (!~displaying.indexOf(id)) {
      newDisplaying = [].concat(_toConsumableArray(displaying), [id]);
    }
    return _extends({}, state, { views: newViews, displaying: newDisplaying });
  },
  'LAYER_STACK_VIEW_HIDE': function LAYER_STACK_VIEW_HIDE(_ref7, _ref8) {var state = _objectWithoutProperties(_ref7, []);var displaying = _ref7.displaying;var id = _ref8.payload;
    if (typeof id !== 'string') {
      return _extends({}, state, { displaying: [] });
    }
    var newDisplaying = [].concat(_toConsumableArray(displaying));
    var index = newDisplaying.indexOf(id);
    if (index !== -1) {
      newDisplaying.splice(index, 1);
      return _extends({}, state, { displaying: newDisplaying });
    }
    return state;
  },
  'LAYER_STACK_VIEW_HIDE_ALL': function LAYER_STACK_VIEW_HIDE_ALL(_ref9) {var state = _objectWithoutProperties(_ref9, []);
    return _extends({}, state, { displaying: [] });
  } },
{
  displaying: [],
  views: {} });
//# sourceMappingURL=reducer.js.map