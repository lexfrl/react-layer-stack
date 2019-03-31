export type ID = number | string;

type LayerHandle = {
  show: () => undefined,
  hide: () => undefined,
  index: number,
  stack: Array<ID>,
  isActive: boolean
};

export type LayerFn = (fn: LayerHandle) => ReactElement;

export type Layer = {
  id: ID,
  mountPointId: ID,
  layerFn: LayerFn,
  args: Array<any>,
  use: Array<any>,
  defaultArgs: Array<any>,
  defaultShow: Boolean,
};

export type LayerStack = Array<ID>;

export type Store = {
  stack: LayerStack,
  layers: { [key: ID] : Layer };
}

export type MountPointProps = {
  id: ID,
  index: number,
}
