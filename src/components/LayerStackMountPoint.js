import React, { Component, PropTypes, createElement} from 'react';
import LayerMountPoint from './LayerMountPoint';
import LayerStore from './../LayerStore'

export default class LayerStackMountPoint extends Component {

  layerStore: LayerStore;

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
    const { id: mountPointId, elementType } = this.props;
    return createElement(elementType, {}, this.layerStore.getLayersForMountPoint(mountPointId)
      .map ((id) => createElement(elementType, { key: id },
        createElement(LayerMountPoint, { id }))))
  }
}

LayerStackMountPoint.contextTypes = {
  layerStore: PropTypes.object
};

LayerStackMountPoint.defaultProps = {
  elementType: 'span'
};