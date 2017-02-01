import React, { Component, Children } from 'react';
import LayerStore from './LayerStore'

export default class LayerStackProvider extends Component {
  getChildContext() {
    return {
      layerStore: new LayerStore()
    }
  }

  render() {
    return Children.only(this.props.children)
  }
}

LayerStackProvider.childContextTypes = {
  layerStore: React.PropTypes.object
};