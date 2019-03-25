import React, { Component, createElement} from 'react';
import PropTypes from 'prop-types';
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
    const { id: mountPointId, elementType, layerStackWrapperClass, layerWrapperClass } = this.props;
    return createElement(elementType, { className: layerStackWrapperClass }, this.layerStore.getLayersForMountPoint(mountPointId)
      .map((id) => createElement(elementType, { key: id, className: layerWrapperClass },
        createElement(LayerMountPoint, { id }))))
  }
}

LayerStackMountPoint.contextTypes = {
  layerStore: PropTypes.object
};

LayerStackMountPoint.defaultProps = {
  elementType: 'span',
  layerStackWrapperClass: '',
  layerWrapperClass: ''
};
