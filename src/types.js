//@flow

export type ID = number | string;

type LayerHandle = {
  index: number,
  isActive: boolean,
  show: (state: any) => void,
  hide: () => void,
  update: (state: any) => void,
  reset: () => void,
};

export type Store = {
  stack: Array<ID>,
  layers: { [key: ID] : Layer };
}

export type LayerFn = (handle: LayerHandle, state: any) => React$Element<any>;

export type LayerProps = {
  id: ID,
  to: ID,
  children: LayerFn,
  initialState: Array<any>,
  defaultShow: Boolean,
};

export type Layer = {
  id: ID,
  to: ID,
  children: LayerFn,
  initialState: Array<any>,
  defaultShow: Boolean,
  state: any,
};

export type LayerToggleProps = {
  for: ID,
  children: (handle: LayerHandle, state) => React$Element<any>,
};

export type LayerMountPointProps = {
  id: ID,
  index: number,
}

export type LayerStackMountPointProps = {
  id: ID,
  elementType: string,
}