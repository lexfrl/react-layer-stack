import { handleActions } from 'redux-actions'
import { createAction } from 'redux-actions'

export const ACTIONS = {
  register: createAction('LAYER_STACK_VIEW_REGISTER', (id, renderFn) => ({ id, renderFn })),
  unregister: createAction('LAYER_STACK_VIEW_UNREGISTER', (id) => ({ id })),
  toggle: createAction('LAYER_STACK_VIEW_TOGGLE'),
  show: createAction('LAYER_STACK_VIEW_SHOW'),
  hide: createAction('LAYER_STACK_VIEW_HIDE'),
};

export default handleActions({
  'LAYER_STACK_VIEW_REGISTER': ({views, ...state}, { payload: { id, renderFn } }) => {
    views = {...views, [id]: renderFn };
    return {...state, views};
  },
  'LAYER_STACK_VIEW_UNREGISTER': ({views, ...state}, { payload: { id } }) => {
    delete views[id]; // mutable for better GC
    return {...state, views: views};
  },
  'LAYER_STACK_VIEW_SHOW': ({displaying, ...state}, { payload: id}) => {
    return {...state, displaying: [...displaying, id] };
  },
  'LAYER_STACK_VIEW_HIDE': ({...state, displaying}, { payload: id }) => {
    if (typeof id !== 'string') {
      return {...state, displaying: [] };
    }
    const newDisplaying = [...displaying];
    const index = newDisplaying.indexOf(id);
    if (index !== -1) {
      newDisplaying.splice(index, 1);
      return {...state, displaying: newDisplaying };
    }
    return state;
  },
}, {
  displaying: [],
    views: {},
});