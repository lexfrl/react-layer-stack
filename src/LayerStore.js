import type { ID, LayerFn } from './types'

import LayerStoreCore from './LayerStoreCore'

export default class LayerStore {

  constructor () {
    this._core = new LayerStoreCore;
    this._mountPointsubscriptions = {};
    this._layerSubscriptions = {};

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.setArgs = this.setArgs.bind(this);
    this.register = this.register.bind(this);
    this.updateFn = this.updateFn.bind(this);
    this.unregister = this.unregister.bind(this);
    this.getLayer = this._core.getLayer;
    this.getStack = this._core.getStack;
    this.getIndex = this._core.getIndex;
    this.isActive = this._core.isActive;
  }

  subscribeToLayer(id: ID, fn: Function) {
    this._layerSubscriptions[id] = fn;
    return () => {
      delete this._layerSubscriptions[id];
    }
  }

  notifyLayer(id: ID) {
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
    const stack = this.getStack();
    this._core.show(id, args);
    if (this.getLayer(id).mountPointId && stack !== this.getStack()) {
      this.notifyMountPoint(this.getLayer(id).mountPointId);
    } else {
      this.notifyLayer(id);
    }
  }

  setArgs(id: ID, args: Array) {
    this._core.setArgs(id, args);
    this.notifyLayer(id);
  }

  hide (id: ID) {
    const stack = this.getStack();
    this._core.hide(id);
    if (this.getLayer(id).mountPointId && stack !== this.getStack()) {
      this.notifyMountPoint(this.getLayer(id).mountPointId);
    } else {
      this.notifyLayer(id);
    }
  }
}