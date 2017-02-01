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
    const { displaying, layers } = this.layerStore.store;
    return children({
      displaying,
      isActive: displaying.indexOf(props.for) !== -1,
      show: (...args) => props.for ? show(props.for, args) : show(args),
      hide: (...args) => props.for ? hide(props.for) : hide(),
    }, ...layers[props.for].args);
  }
}

LayerToggle.contextTypes = {
  layerStore: PropTypes.object
};