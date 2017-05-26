import type { LayerMountPointProps } from './../types'

import React, { Component, createElement, PropTypes} from 'react'
import LayerStore from './../LayerStore';

export default class LayerMountPoint extends Component {

  props: LayerMountPointProps;
  layerStore: LayerStore;

  constructor(props, context) {
    super(props, context);
    this.unsubscribe = null;
    this.layerStore = context.layerStore;
  }

  shouldComponentUpdate() {
    return true;
  }

  componentWillMount() {
    this.unsubscribe = this.layerStore.subscribeToLayer(this.props.id, () => {
      console.log(this.layerStore)
      this.setState({})
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.unsubscribe = null;
    this.layerStore = null;
  }

  render() {
    const { id } = this.props;
    const stack = this.layerStore.getStack();
    const layer = this.layerStore.getLayer(id);
    const index = this.layerStore.getIndex(id);
    return isActive(id) ? layer.children({
      index, id, stack, // seems like there is no valid use-case to in the Layer render function
      hide: () => this.layerStore.hide(id), // intention here is to hide ID's management from Layer and let app developer manage these IDs independently
      // which will give an ability to write general-purpose Layers and share them b/w projects
      show: (...args) => this.layerStore.show(id, args), // sometimes you may want to change args of the current layer
      update: (...args) => this.layerStore.update(id, args),
      reset: () => this.layerStore.reset(id)
    }, ...layer.args) : null;
  }
}

LayerMountPoint.contextTypes = {
  layerStore: PropTypes.object
};

LayerMountPoint.defaultProps = {
  index: 0
};