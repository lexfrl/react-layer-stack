//@flow

import type { ID, Layer, LayerProps, Store } from './types'

export default class LayerStoreCore {

  store: Store;

  constructor () {
    this.store = {
      stack: [],
      layers: {},
    };
  }

  getLayer(id: ID): Layer {
    return this.store.layers[id];
  }

  getLayersForMountPoint(to: ID) {
    const { layers } = this.store;
    return Object.keys(layers).filter(id => layers[id].to === to)
  }

  getStack(): Array<ID> {
    return this.store.stack;
  }

  getIndex(id: ID) {
    return this.store.stack.indexOf(id);
  }

  isActive(id: ID) {
    return this.store.stack.indexOf(id) !== -1;
  }

  register (props: LayerProps) {
    const { id } = props;
    this.store.layers[id] = props;
    this.reset(id);
  }

  updateFn (props: LayerProps) {
    const { id } = props;
    const layer = this.store.layers[id];
    this.store.layers[id] = Object.assign(layer, props);
  }

  reset(id: ID) {
    const layer = this.store.layers[id];
    layer.state = layer.initialState;
    if (layer.defaultShow) {
      this.show(id);
    }
  }

  unregister(id: ID) {
    delete this.store.layers[id];
  }

  update(id: ID, state) {
    if (Ob)
    this.store.layers[id].state = state;
  }

  show (id: ID, state) {
    const { stack } = this.store;
    if(args && args.length) {
      this.update(id, args);
    }
    if ( id !== stack[stack.length - 1] ) {
      this.hide(id);
      this.store.stack = [...stack, id];
    }
  }

  hide (id: ID) {
    const stack = [...this.store.stack];
    if (-1 !== stack.indexOf(id)) {
      stack.splice(stack.indexOf(id), 1);
      this.store.stack = stack;
    }
  }
}
