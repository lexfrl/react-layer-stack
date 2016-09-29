import { LayerStackMountPoint as LSMP, Layer as L, LayerToggle as LT } from './components'

export const DEFAULT_STORE_KEY = 'layer_stack'; // should be used in combineReducers

const LayerStackMountPoint = LSMP(DEFAULT_STORE_KEY); // this allows you to specify the key or "namespace" in your store
const Layer = L(DEFAULT_STORE_KEY);
const LayerToggle = LT(DEFAULT_STORE_KEY);

export { LayerStackMountPoint, Layer, LayerToggle }