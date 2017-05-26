import type { ID, LayerProps } from './types'

import LayerStoreCore from './LayerStoreCore'

export default class LayerStore {

  constructor () {
    this._core = new LayerStoreCore;
    this._layerSubscriptions = {};
    this._mountPointsubscriptions = {};

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

  notifyStack(fromIndex) {
    const stack = this._core.getStack();
    const { length } = stack;
    for (let i = fromIndex; i < length; ++i) {
      this.notifyLayer(stack[i]);
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

  register (props: LayerProps) {
    const { id, to } = props;
    this._core.register(props);
    if (to) {
      this.notifyMountPoint(to);
    } else {
      this.notifyLayer(id);
    }
  }

  updateFn (props: LayerProps) {
    const { id, to } = props;
    const lastMountPoint = this.getLayer(id).to;
    this._core.updateFn(props);
    if (lastMountPoint !== to) {
      this.notifyMountPoint(lastMountPoint);
      this.notifyMountPoint(to);
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
    const index = this.getIndex(id);
    this._core.show(id, args);
    this.notifyStack(index);
  }

  update(id: ID, args: Array) {
    this._core.update(id, args);
    this.notifyLayer(id);
  }

  hide (id: ID) {
    const index = this.getIndex(id);
    this._core.hide(id);
    this.notifyLayer(id);
    this.notifyStack(index);
  }

  getLayer(id: ID): Layer {
    return this._core.getLayer(id);
  }

  getLayersForMountPoint(to: ID): Array<ID> {
    return this._core.getLayersForMountPoint(to);
  }

  getStack(): Array<ID> {
    return this._core.getStack();
  }

  getIndex(id: ID) {
    return this._core.getIndex(id);
  }

  isActive(id: ID) {
    return this._core.isActive(id);
  }
}