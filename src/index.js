import { LayerStackMountPoint as LSMP, Layer as L, LayerContext as LC } from './components'
import reducer from './reducer'

export const DEFAULT_STORE_KEY = 'layer_stack'; // should be used in combineReducers

const LayerStackMountPoint = LSMP(DEFAULT_STORE_KEY); // this allows you to specify the key or "namespace" in your store
const Layer = L(DEFAULT_STORE_KEY);
const LayerContext = LC(DEFAULT_STORE_KEY);

export { LayerStackMountPoint, Layer, LayerContext, reducer }