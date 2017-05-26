import type { LayerProps } from './../types'

import React, { Component, PropTypes, createElement} from 'react';
import LayerStore from './../LayerStore';
import LayerMountPoint from './LayerMountPoint';

export default class Layer extends Component {

  props: LayerProps;
  layerStore: LayerStore;

  constructor(props, context) {
    super(props, context);
    this.layerStore = context.layerStore;
  }

  componentWillMount() {
    const { id, children, to } = this.props;
    this.layerStore.register(id, children, to, this.props.defaultArgs, this.props.defaultShow);
  }

  componentWillUpdate({ id, children, to, defaultArgs, defaultShow }) {
    this.layerStore.updateFn(id, children, to, defaultArgs, defaultShow);
  }

  componentWillUnmount() {
    this.layerStore = null;
  }

  render() {
    const { id, to } = this.props;
    if (!to) {
      return createElement(LayerMountPoint, { id });
    }
    return null;
  }
}

Layer.defaultProps = {
  elementType: 'span'
};

Layer.contextTypes = {
  layerStore: PropTypes.object
};