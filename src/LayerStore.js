import type { ID, LayerFn } from './types'

export default class LayerStore {

  constructor () {
    this.store = {
      displaying: [],
      layers: {},
    };
    this._mountPointsubscriptions = {};
    this._layerSubscriptions = {};
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.register = this.register.bind(this);
    this.updateFn = this.updateFn.bind(this);
    this.unregister = this.unregister.bind(this);
  }

  register (id: ID, layerFn: LayerFn, mountPointId: ID = null, groups: Array<ID> = [], defaultArgs: Array<any> = []) {
    this.store.layers[id] = { layerFn, groups, mountPointId, args: defaultArgs, defaultArgs };
  }

  updateFn (id: ID, layerFn: LayerFn) {
    this.store.layers[id].fn = layerFn;
  }

  unregister(id: ID) {
    delete this.store.layers[id];
  }

  setArgs(id: ID, args: Array<any> = []) {
    if (args.length) {
      this.store.layers[id].args = args;
    } else {
      this.store.layers[id].args = this.store.layers[id].defaultArgs;
    }
  }

  show (id: ID, args: Array<any>) {
    this.setArgs(id, args);
    this.hide(id);
    this.store.displaying.push(id);
  }

  hide (id: ID) {
    const { displaying } = this.store;
    if (-1 !== displaying.indexOf(id)) {
      displaying.splice(displaying.indexOf(id), 1);
    }
  }

  subscribeToLayer(id: ID, fn: Function) {
    this._layerSubscriptions[id] = fn;
    return () => {
      delete this._layerSubscriptions[id];
    }
  }

  notifyLayer(id: ID, fn: Function) {
    if (this._layerSubscriptions[id]) {
      this._layerSubscriptions[id]()
    }
  }

  subscribeToMountPoint(id: ID, fn: Function) {
    this._mountPointsubscriptions[id] = fn;
    return () => {
      delete this._mountPointsubscriptions[id];
    }
  }

  notifyMountPoint(mountPointId: ID) {
    if (this._mountPointsubscriptions[mountPointId]) {
      this._mountPointsubscriptions[mountPointId]()
    }
  }
}
