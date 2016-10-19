import React, { Component } from 'react';

const styles = {
  position: 'absolute',
  left: '0',
  right: '0',
  // textAlign: 'center',
  top: '100px',
  width: '600px',
  height: 'auto',
  borderRadius: '5px',
  boxShadow: '0px 0px 110px 0px rgba(0,0,0,0.60)',
};

export default class Window extends Component {

  render () {

    return (
      <div style={{...styles, ...this.props.style}}>
        {this.props.children}
      </div>
    )
  }
}

