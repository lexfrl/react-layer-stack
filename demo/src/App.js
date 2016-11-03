import React, { Component } from 'react';
import './App.css';
import { LayerStackProvider, LayerStackMountPoint } from 'react-layer-stack'

import Demo from './Demo'

class App extends Component {
  render() {
    return (
      <LayerStackProvider>
        <div>
          <LayerStackMountPoint />
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
