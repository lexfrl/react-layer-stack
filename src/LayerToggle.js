import React, { Component, PropTypes, createElement} from 'react'

export default class LayerToggle extends Component {

  constructor(props, context) {
    super(props, context);
    this.unsubscribe = context.layerStore.subscribeToLayer(props.id, () => {
      this.setState({})
    });
    this.layerStore = context.layerStore;
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