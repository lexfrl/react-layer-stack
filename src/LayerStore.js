import type { ID, LayerFn } from './types'

import LayerStoreCore from './LayerStoreCore'

export default class LayerStore {

  constructor () {
    this._core = new LayerStoreCore;
    this._layerSubscriptions = {};
    this._mountPointsubscriptions = {};

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.update = this.update.bind(this);
    this.register = this.register.bind(this);
    this.updateFn = this.updateFn.bind(this);
    this.unregister = this.unregister.bind(this);
    this.getLayer = this._core.getLayer;
    this.getStack = this._core.getStack;
    this.getIndex = this._core.getIndex;
    this.isActive = this._core.isActive;
    this.getLayersForMountPoint = this._core.getLayersForMountPoint;
  }

  subscribeToLayer(id: ID, fn: Function) {
    if (typeof this._layerSubscriptions[id] === 'undefined') {
      this._layerSubscriptions[id] = new Set();
    }
    this._layerSubscriptions[id].add(fn);
    return () => {
      return this._layerSubscriptions[id].delete(fn);
    }
  }

  subscribeToMountPoint(id: ID, fn: Function) {
    if (typeof this._mountPointsubscriptions[id] === 'undefined') {
      this._mountPointsubscriptions[id] = new Set();
    }
    this._mountPointsubscriptions[id].add(fn);
    return () => {
      return this._mountPointsubscriptions[id].delete(fn);
    }
  }

  notifyLayer(id: ID) {
    if (this._layerSubscriptions[id]) {
      this._layerSubscriptions[id].forEach(fn => fn())
    }
  }

  notifyMountPoint(id: ID) {
    if (this._mountPointsubscriptions[id]) {
      this._mountPointsubscriptions[id].forEach(fn => fn());
    }
  }

  register (id: ID, layerFn: LayerFn, mountPointId: ID = null,
            groups: Array<ID> = [], use: Array<any>, defaultArgs: Array<any> = [],
            defaultShow: Boolean) {
    this._core.register(id, layerFn, mountPointId, groups, use, defaultArgs, defaultShow);
    if (mountPointId) {
      this.notifyMountPoint(mountPointId);
    } else {
      this.notifyLayer(id);
    }
  }

  updateFn (id: ID, layerFn: LayerFn, mountPointId: ID = null,
            groups: Array<ID> = [], use: Array, defaultArgs: Array = [],
            defaultShow: Boolean) {
    const lastMountPoint = this.getLayer(id).mountPointId;
    this._core.updateFn(id, layerFn, mountPointId, groups, use, defaultArgs, defaultShow);
    if (lastMountPoint !== mountPointId) {
      this.notifyMountPoint(lastMountPoint);
      this.notifyMountPoint(mountPointId);
    } else {
      this.notifyLayer(id);
    }
  }

  reset(id: ID) {
    this._core.reset(id);
    this.notifyLayer(id)
  }

  unregister(id: ID) {
    this._core.unregister(id);
  }

  show (id: ID, args: Array) {
    this._core.show(id, args);
    this.notifyLayer(id);
  }

  update(id: ID, args: Array) {
    this._core.update(id, args);
    this.notifyLayer(id);
  }

  hide (id: ID) {
    const stack = this.getStack();
    this._core.hide(id);
    this.notifyLayer(id);
  }
}
