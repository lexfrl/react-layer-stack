import React, { Component } from 'react';
import { Layer, LayerToggle } from 'react-layer-stack'

// import Button from './components/Button'
import FixedLayer from './components/FixedLayer'
import Window from './components/Window'
import Dialog from './components/Dialog'

class Demo extends Component {
  render() {
    return (
      <div>
        <Layer id="test">{({ index, hideMe }) => (
          <FixedLayer onClick={ hideMe } zIndex={ index * 100 }>
            <Window>
              <Dialog/>
            </Window>
          </FixedLayer> )}
        </Layer>
        <LayerToggle id="test">{({ showMe }) => (
          <button onClick={ showMe }>TEST</button> )}
        </LayerToggle>
      </div>
    );
  }
}

export default Demo;
