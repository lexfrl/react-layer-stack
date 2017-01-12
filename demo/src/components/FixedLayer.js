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

const escapeStack = [];

window.addEventListener('keydown',
  (e) => escapeStack.length && 27 === e.keyCode && escapeStack[escapeStack.length-1].call(null, e),
  true);

export default class FixedLayer extends Component {

  static defaultProps = {
    zIndex: 2000,
    onClick: null,
  };

  componentWillMount() {
    if (this.props.onEsc) {
      escapeStack.push(this.props.onEsc)
    }
  }

  componentWillUnmount() {
    if (this.props.onEsc) {
      escapeStack.pop()
    }
  }

  render () {
    const divProps = { ...this.props };
    delete divProps.zIndex;
    delete divProps.onEsc;
    return (
      <div { ...divProps }
        onClick={ (e) => this.props.onClick && (e.target === ReactDom.findDOMNode(this)) && this.props.onClick() }
        style={{...this.props.style, ...styles(this.props.onClick), ...{zIndex: this.props.zIndex}}}>
          {this.props.children}
      </div>
    )
  }
}