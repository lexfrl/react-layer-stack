import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';

export default class FixedLayer extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    zIndex: PropTypes.number,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    zIndex: 2000,
    onClick: null,
  };

  render () {
    console.log(styles(this.props.onClick))
    return (
      <div { ...this.props } onClick={ (e) => this.props.onClick && (e.target === ReactDom.findDOMNode(this)) && this.props.onClick() }
                             style={{...this.props.style, ...styles(this.props.onClick), ...{zIndex: this.props.zIndex}}}>
        {this.props.children}
      </div>
    )
  }
}

const styles = (onClick) => ({
  position: 'fixed',
  pointerEvents: onClick ? 'auto' : 'none',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  height: '100%',
});
