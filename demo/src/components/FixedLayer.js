import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';

export default class Overlay extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    zIndex: PropTypes.number,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    zIndex: 2000,
    onClick: () => {},
  };

  render () {

    return (
      <div onClick={ (e) => (e.target === ReactDom.findDOMNode(this)) && this.props.onClick() } style={{...styles.layer, ...{zIndex: this.props.zIndex}}}>
        {this.props.children}
      </div>
    )
  }
}

const styles = {
  layer: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    height: '100%',
    },
};
