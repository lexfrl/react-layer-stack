import type { ID, LayerFn, Layer, Store, LayerStack, ILayerStore } from './types'

export default class LayerStoreCore {

  store: Store;

  constructor () {
    this.store = {
      stack: [],
      layers: {},
    };

    this.getLayer = this.getLayer.bind(this);
    this.getStack = this.getStack.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.register = this.register.bind(this);
    this.updateFn = this.updateFn.bind(this);
    this.unregister = this.unregister.bind(this);
    this.isActive = this.isActive.bind(this);
    this.getIndex = this.getIndex.bind(this);
  }

  getLayer(id: ID): Layer {
    return this.store.layers[id];
  }

  getStack(): LayerStack {
    return this.store.stack;
  }

  register (id: ID, layerFn: LayerFn, mountPointId: ID = null,
            groups: Array<ID> = [], use: Array, defaultArgs: Array = [],
            defaultShow: Boolean) {
    this.store.layers[id] = { layerFn, groups, mountPointId, defaultArgs, defaultShow, use };
    this.reset(id);
  }

  updateFn (id: ID, layerFn: LayerFn, mountPointId: ID = null,
            groups: Array<ID> = [], use: Array, defaultArgs: Array = [],
            defaultShow: Boolean) {
    const layer = this.getLayer(id);
    layer.fn = layerFn;
    layer.use = use;
    layer.mountPointId = mountPointId;
    layer.groups = groups;
    layer.defaultArgs = defaultArgs;
    layer.defaultShow = defaultShow;
  }

  reset(id: ID) {
    const layer = this.store.layers[id];
    layer.args = layer.defaultArgs;
    if (layer.defaultShow) {
      this.show(id);
    }
  }

  unregister(id: ID) {
    delete this.store.layers[id];
  }

  setArgs(id: ID, args: Array = []) {
    if (args.length) {
      this.store.layers[id].args = args;
    } else {
      this.store.layers[id].args = this.store.layers[id].defaultArgs;
    }
  }

  show (id: ID, args: Array) {
    const { stack } = this.store;
    this.setArgs(id, args);
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

  getIndex(id: ID) {
    return this.store.stack.indexOf(id);
  }

  isActive(id: ID) {
    return this.store.stack.indexOf(id) !== -1;
  }
}
