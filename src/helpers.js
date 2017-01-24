export function createAction(type, payloadCreator = (v) => v) {
  return (...args) => {
    const action = { type };
    const payload = payloadCreator(...args);
    if (typeof payload !== 'undefined') {
      action.payload = payload;
    }
    return action;
  };
}

export function handleActions(handlers, defaultState) {
  return (state = defaultState, action) => {
    return handlers[action.type] ? handlers[action.type](state, action) : state;
  }
}

