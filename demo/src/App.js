import React, { Component } from 'react';
import './App.css';
import { LayerStackProvider, LayerStackMountPoint } from 'react-layer-stack'

import Demo from './Demo'

class App extends Component {
  render() {
    return (
      <LayerStackProvider>
        <div>
          <LayerStackMountPoint id="screen" elementType="div" wrapperClass="screen-wrapper" wrapperActiveClass="has-layers" layerItemClass="layer-element" layerItemActiveClass="active-element" />
          <div className="App">
            <div className="App-header">
              <h2>react-layer-stack DEMO</h2>
            </div>
            <div>
              <Demo/>
            </div>
          </div>
        </div>
      </LayerStackProvider>
    );
  }
}

export default App;
