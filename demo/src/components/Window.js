import React, { Component } from 'react';

const styles = {
  position: 'absolute',
  willChange: 'transform',
  transform: `translateX(0px) translateY(0px)`,
  // textAlign: 'center',
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

