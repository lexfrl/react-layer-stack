import React, { Component } from 'react';
import './App.css';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import {
  LayerStackMountPoint,
  DEFAULT_STORE_KEY as DEFAULT_LAYERS_STORE_KEY,
  reducer as layersReducer } from 'react-layer-stack'

import Demo from './Demo'

const reducer = combineReducers({[DEFAULT_LAYERS_STORE_KEY]: layersReducer});
const store = createStore(reducer);
window.__STORE = store;
class App extends Component {
  render() {
    return (
      <Provider store={store} key="provider">
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
      </Provider>
    );
  }
}

export default App;
