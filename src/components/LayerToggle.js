import React, { Component, PropTypes, createElement} from 'react'
import LayerStore from './../LayerStore'

export default class LayerToggle extends Component {

  layerStore: LayerStore;

  constructor(props, context) {
    super(props, context);
    this.unsubscribe = null;
    this.layerStore = context.layerStore;
  }

  componentWillMount() {
    this.unsubscribe = this.layerStore.subscribeToLayer(this.props.for, () => {
      setTimeout(() => this.setState({}), 100 );
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.unsubscribe = null;
    this.layerStore = null;
  }

  render () {
    const { children, ...props } = this.props;
    const { show, hide } = this.layerStore;
    const stack = this.layerStore.getStack();
    return children({
      stack,
      isActive: stack.indexOf(props.for) !== -1,
      show: (...args) => props.for ? show(props.for, args) : show(args),
      hide: (...args) => props.for ? hide(props.for) : hide(),
    }, ...this.layerStore.getLayer(props.for).args);
  }
}

LayerToggle.contextTypes = {
  layerStore: PropTypes.object
};