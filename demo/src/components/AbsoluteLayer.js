import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';

export default class AbsoluteLayer extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    zIndex: PropTypes.number,
  };

  static defaultProps = {
    zIndex: 2000,
  };

  render () {

    return (
      <div { ...this.props } style={{...this.props.style, ...styles.layer, ...{zIndex: this.props.zIndex}}}>
        {this.props.children}
      </div>
    )
  }
}

const styles = {
  layer: {
    position: 'absolute',
    left: 0,
    top: 0,
    },
};
