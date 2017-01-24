'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.createAction = createAction;exports.










handleActions = handleActions;function createAction(type) {var payloadCreator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (v) {return v;};return function () {var action = { type: type };var payload = payloadCreator.apply(undefined, arguments);if (typeof payload !== 'undefined') {action.payload = payload;}return action;};}function handleActions(handlers, defaultState) {
  return function () {var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;var action = arguments[1];
    return handlers[action.type] ? handlers[action.type](state, action) : state;
  };
}
//# sourceMappingURL=helpers.js.map