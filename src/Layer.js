import React, { Component, PropTypes, createElement} from 'react'
import { isPrimitiveType } from './helpers'

export default class Layer extends Component {
  componentWillMount() {
    const { layerStore } = this.context;
    layerStore.register(this.props.id, this.props.children, this.props.mountPointId);
    if (this.props.showInitially) {
      layerStore.show(this.props.id, this.props.defaultArgs || [])
    } else {
      layerStore.setArgs(this.props.id, this.props.defaultArgs || [])
    }
  }

  shouldComponentUpdate(newProps) {
    const { children, id, mountPointId, use } = this.props;
    const { layerStore } = this.context;
    let needUpdate = false;
    if (id !== newProps.id || mountPointId !== newProps.mountPointId) {
      needUpdate = true;
    }
    else if (children.toString() !== newProps.children.toString()) {
      needUpdate = true;
    }
    else if (use) {
      if (use.length !== newProps.use.length) {
        needUpdate = true;
      } else {
        let i = use.length;
        while (i--) {
          if (isPrimitiveType(use[i]) && isPrimitiveType(newProps.use[i])) {
            if (use[i] !== newProps.use[i]) {
              needUpdate = true
            }
          }
          else if (typeof use[i].equals === 'function' && typeof newProps.use[i].equals === 'function') {
            if (!use[i].equals(newProps.use[i])) { // fast equality check for immutable-js && mori
              needUpdate = true;
            }
          }
          else if (JSON.stringify(use[i]) !== JSON.stringify(newProps.use[i])) {
            needUpdate = true;
          }
        }
      }
    }

    if (needUpdate) {
      layerStore.updateFn(newProps.id, newProps.children);
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    // TODO: garbage collection
    // this.props.unregister(this.props.id)
  }

  render() {
    return null;
  }
}

Layer.propTypes = {
  use: PropTypes.array
};

Layer.contextTypes = {
  layerStore: PropTypes.object
};