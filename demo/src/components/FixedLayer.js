import React, { Component } from 'react';
import ReactDom from 'react-dom';

const styles = (onClick) => ({
  position: 'fixed',
  pointerEvents: onClick ? 'auto' : 'none',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  height: '100%',
});

export default class FixedLayer extends Component {

  static defaultProps = {
    zIndex: 2000,
    onClick: null,
  };

  render () {
    const divProps = { ...this.props };
    delete divProps.zIndex;
    return (
      <div { ...divProps }
        onClick={ (e) => this.props.onClick && (e.target === ReactDom.findDOMNode(this)) && this.props.onClick() }
        style={{...this.props.style, ...styles(this.props.onClick), ...{zIndex: this.props.zIndex}}}>
          {this.props.children}
      </div>
    )
  }
}