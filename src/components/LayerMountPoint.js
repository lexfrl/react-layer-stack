import React, { Component, createElement, PropTypes} from 'react'
import LayerStore from './../LayerStore';
import type { MountPointProps } from './../types'

export default class LayerMountPoint extends Component {

  props: MountPointProps;
  layerStore: LayerStore;

  constructor(props, context) {
    super(props, context);
    this.unsubscribe = null;
    this.layerStore = context.layerStore;
  }

  shouldComponentUpdate(props, state) {
    return true;
  }

  componentWillMount() {
    this.unsubscribe = this.layerStore.subscribeToLayer(this.props.id, () => {
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
    const { show, hide, update, isActive } = this.layerStore;
    const stack = this.layerStore.getStack();
    const layer = this.layerStore.getLayer(id);
    const index = this.layerStore.getIndex(id);
    return isActive(id) ? layer.layerFn({
      index, id, stack, // seems like there is no valid use-case mountPointId in the Layer render function
      hide: () => hide(id), // intention here is to hide ID's management from Layer and let app developer manage these IDs independently
      // which will give an ability to write general-purpose Layers and share them b/w projects
      show: (...args) => show(id, args), // sometimes you may want to change args of the current layer
      update: (...args) => update(id, args)
    }, ...layer.args) : null;
  }
}

LayerMountPoint.contextTypes = {
  layerStore: PropTypes.object
};

LayerMountPoint.defaultProps = {
  index: 0
};