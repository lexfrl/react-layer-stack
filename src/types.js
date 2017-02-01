export type ID = number | string;

type LayerHandle = {
  show: () => undefined,
  hide: () => undefined,
  index: number,
  displaying: Array<ID>,
  isActive: boolean
}

export type LayerFn = (fn: LayerHandle) => ReactElement;