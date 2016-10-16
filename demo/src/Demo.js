import React, { Component } from 'react';
import { Layer, LayerToggle } from 'react-layer-stack'

// import Button from './components/Button'
import FixedLayer from './components/FixedLayer'
import Window from './components/Window'

class Demo extends Component {
  render() {
    return (
      <div>
        <Layer id="test">{({ index, hideMe, showMe }) => (
          <FixedLayer onClick={ hideMe } zIndex={ index * 100 }>
            <Window>
              <div style={styles.header}>

              </div>
              <div style={styles.body}>

              </div>
            </Window>
          </FixedLayer> )}
        </Layer>
        <LayerToggle id="test">{({ showMe }) => (
          <button onClick={ () => showMe() }>TEST</button> )}
        </LayerToggle>
      </div>
    );
  }
}

const styles = {
  header: {
    height: '50px',
    background: '#F6F6F6',
    borderRadius: '5px 5px 0 0',
    borderWidth: '1px',
    borderBottom: '1px solid',
  },
  body: {
    height: '300px',
    background: '#FFFFFF',
    borderRadius: '0 0 5px 5px',
  },
  footer: {
    height: '50px',
    background: '#F6F6F6',
    borderRadius: '0 0 5px 5px',
    borderTop: '1px solid',
  }
};

export default Demo;
