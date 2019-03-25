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
    const { id: mountPointId, elementType, wrapperClass, wrapperActiveClass, layerItemClass, layerItemActiveClass } = this.props;
    const activeLayersForMountPointCount = this.layerStore.getActiveLayersForMountPoint(mountPointId).length;
    const wrapperClassName = wrapperClass ? wrapperClass + (activeLayersForMountPointCount ? ' ' + wrapperActiveClass : '') : '';
    return createElement(elementType, { className: wrapperClassName }, this.layerStore.getLayersForMountPoint(mountPointId)
      .map((id) => createElement(elementType, { key: id, className: (layerItemClass + (layerItemActiveClass && this.layerStore.getLayer(id).isActive ? ' ' + layerItemActiveClass : '')) },
        createElement(LayerMountPoint, { id }))))
  }
}

LayerStackMountPoint.contextTypes = {
  layerStore: PropTypes.object
};

LayerStackMountPoint.defaultProps = {
  elementType: 'span',
  wrapperClass: '',
  wrapperActiveClass: '',
  layerItemClass: ''
};
