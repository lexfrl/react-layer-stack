import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import {
  LayerStackMountPoint,
  DEFAULT_STORE_KEY as DEFAULT_LAYERS_STORE_KEY,
  reducer as layersReducer } from 'react-layer-stack'

const reducer = combineReducers({[DEFAULT_LAYERS_STORE_KEY]: layersReducer});
const logger = createLogger();
const create = applyMiddleware(logger)(createStore)
const store = create(reducer);
window.__STORE = store;
class App extends Component {
  render() {
    return (
      <Provider store={store} key="provider">
        <div>
          <LayerStackMountPoint />
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>react-layer-stack DEMO</h2>
            </div>
            <p className="App-intro">
            </p>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
