import React, { Component, createElement} from 'react';
import PropTypes from 'prop-types';
import { isPrimitiveType } from './../common';
import LayerStore from './../LayerStore';
import LayerMountPoint from './LayerMountPoint';

export default class Layer extends Component {

  layerStore: LayerStore;

  constructor(props, context) {
    super(props, context);
    this.layerStore = context.layerStore;
  }

  componentWillMount() {
    const { layerStore } = this.context;
    const { id, children, to, use, defaultArgs, defaultShow } = this.props;
    layerStore.register(id, children, to, null, use, defaultArgs, defaultShow);
  }

  shouldComponentUpdate(newProps) {
    const { children, id, to, use } = this.props;
    const { layerStore } = this.context;
    let needUpdate = false;
    if (id !== newProps.id || to !== newProps.to) {
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
      layerStore.updateFn(newProps.id, newProps.children, newProps.to, null, newProps.use, newProps.defaultArgs, newProps.defaultShow);
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    this.layerStore = null;
  }

  render() {
    const { id, to, elementType } = this.props;
    if (!to) {
      return createElement(LayerMountPoint, { id });
    }
    return null;
  }
}

Layer.propTypes = {
  use: PropTypes.array
};

Layer.defaultProps = {
  elementType: 'span'
};

Layer.contextTypes = {
  layerStore: PropTypes.object
};
