'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.reducer = exports.LayerToggle = exports.Layer = exports.LayerStackMountPoint = exports.DEFAULT_STORE_KEY = undefined;var _components = require('./components');
var _reducer = require('./reducer');var _reducer2 = _interopRequireDefault(_reducer);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var DEFAULT_STORE_KEY = exports.DEFAULT_STORE_KEY = 'layer_stack'; // should be used in combineReducers

var LayerStackMountPoint = (0, _components.LayerStackMountPoint)(DEFAULT_STORE_KEY); // this allows you to specify the key or "namespace" in your store
var Layer = (0, _components.Layer)(DEFAULT_STORE_KEY);
var LayerToggle = (0, _components.LayerToggle)(DEFAULT_STORE_KEY);exports.

LayerStackMountPoint = LayerStackMountPoint;exports.Layer = Layer;exports.LayerToggle = LayerToggle;exports.reducer = _reducer2.default;
//# sourceMappingURL=index.js.map