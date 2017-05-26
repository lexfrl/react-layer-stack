import type { LayerToggleProps } from './../types'

import React, { Component, PropTypes, createElement} from 'react'
import LayerStore from './../LayerStore'

export default class LayerToggle extends Component {

  props: LayerToggleProps;
  layerStore: LayerStore;


  constructor(props, context) {
    super(props, context);
    this.unsubscribe = null;
    this.layerStore = context.layerStore;
  }

  componentWillMount() {
    this.unsubscribe = this.layerStore.subscribeToLayer(this.props.for, () => {
      this.setState({});
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.unsubscribe = null;
    this.layerStore = null;
  }

  render () {
    const { children, ...props } = this.props;
    const stack = this.layerStore.getStack();
    return children({
      stack,
      isActive: stack.indexOf(props.for) !== -1,
      show: (...args) => props.for ? this.layerStore.show(props.for, args) : this.layerStore.show(args),
      hide: (id = null) => props.for ? this.layerStore.hide(props.for) : this.layerStore.hide(id),
      toggle: (_id) => {
        const id = props.for ? props.for : _id;
        stack.indexOf(props.for) !== -1 ? this.layerStore.hide(id) : this.layerStore.show(id);
      },
      reset: (id) => props.for ? this.layerStore.reset(props.for) : this.layerStore.reset(id),
    }, ...this.layerStore.getLayer(props.for).args);
  }
}

LayerToggle.contextTypes = {
  layerStore: PropTypes.object
};