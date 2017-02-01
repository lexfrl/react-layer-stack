import React, { Component, PropTypes, createElement} from 'react'

export default class LayerStackMountPoint extends Component {

  constructor(props, context) {
    super(props, context);
    this.unsubscribe = context.layerStore.subscribeToMountPoint(props.id, () => {
      this.setState({})
    });
    this.layerStore = context.layerStore;
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.unsubscribe = null;
    this.layerStore = null;
  }

  render() {
    const { id: mountPointId, elementType, mountPointArgs, children: fn } = this.props;
    const { show, hide } = this.layerStore;
    const { layers, displaying } = this.layerStore.store;
    return createElement(elementType, {}, fn ? fn({layers, displaying, show, hide, mountPointId, mountPointArgs}) // it's possible to provide alternative layerFn for the MountPoint
      : displaying.map ((id, index) => // if no alternative layerFn provided we'll use the default one
        createElement(elementType, { key: id }, (() => {
          const layer = layers[id];
          if (layer && layer.layerFn && layer.mountPointId === mountPointId) {
            return layer.layerFn({
              index, id, displaying, layers, mountPointArgs, // seems like there is no valid use-case mountPointId in the Layer render function
              hide: () => hide(id), // intention here is to hide ID's management from Layer and let app developer manage these IDs independently
              // which will give an ability to write general-purpose Layers and share them b/w projects
              show: (...args) => show(id, ...args) // sometimes you may want to change args of the current layer
            }, ...layer.args)
          }
          if (typeof layer === 'undefined' || typeof layer.layerFn === 'undefined') {
            throw new Error(`
    It seems like you're using LayerToggle with id="${ id }" but corresponding Layer isn't declared in the current Components tree.
    Make sure that Layer with id="${ id }" is rendered into the current tree.
    `
            )
          }
    })())))
  }
}

LayerStackMountPoint.contextTypes = {
  layerStore: PropTypes.object
};

LayerStackMountPoint.defaultProps = {
  elementType: 'span'
};