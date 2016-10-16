import React, { Component, PropTypes } from 'react';

export default class Dialog extends Component {

  render () {

    return (
      <div>
        <div style={styles.header}>

        </div>
        <div style={styles.body}>

        </div>
        <div style={styles.footer}>

        </div>
      </div>
    )
  }
}

const styles = {
  header: {
    height: '50px',
    background: '#F6F6F6',
    borderRadius: '5px 5px 0 0',
  },
  body: {
    height: '300px',
    background: '#FFFFFF',
  },
  footer: {
    height: '50px',
    background: '#F6F6F6',
    borderRadius: '0 0 5px 5px',
  }
};
