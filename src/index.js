import React, { Component } from 'react';
import { LayerStackMountPoint as LSMP, Layer as L, LayerContext as LC } from './components'
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import reducer from './reducer'

export const DEFAULT_STORE_KEY = 'layer_stack'; // should be used in combineReducers

const LayerStackMountPoint = LSMP(DEFAULT_STORE_KEY); // this allows you to specify the key or "namespace" in your store
const Layer = L(DEFAULT_STORE_KEY);
const LayerContext = LC(DEFAULT_STORE_KEY);

const configuredReducer = combineReducers({[DEFAULT_STORE_KEY]: reducer});
const store = createStore(configuredReducer);

class LayerStackProvider extends Component {
  render() {
    return <Provider store={ store } { ...this.props }>{ this.props.children }</Provider>
  }
}

export { LayerStackMountPoint, Layer, LayerContext, LayerStackProvider, reducer }