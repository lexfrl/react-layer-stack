import React, { Component, PropTypes } from 'react';

export default class Window extends Component {

  render () {

    return (
      <div style={{...styles.window, ...this.props.style}}>
        {this.props.children}
      </div>
    )
  }
}

const styles = {
  window: {
    position: 'absolute',
    left: '0',
    right: '0',
    // textAlign: 'center',
    top: '100px',
    width: '600px',
    height: 'auto',
    borderRadius: '5px',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    boxShadow: '0px 0px 100px 0px rgba(0,0,0,0.48)',
  },
};
