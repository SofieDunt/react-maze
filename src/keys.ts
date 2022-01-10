import { SearchTypeEnum, DirectionEnum } from "./api/dto";

export const SEARCH_KEYS: { [key: string]: SearchTypeEnum } = {
  b: SearchTypeEnum.BFS,
  f: SearchTypeEnum.DFS,
};

export const MOVE_KEYS: { [key: string]: DirectionEnum } = {
  ArrowLeft: DirectionEnum.LEFT,
  a: DirectionEnum.LEFT,
  ArrowRight: DirectionEnum.RIGHT,
  d: DirectionEnum.RIGHT,
  ArrowUp: DirectionEnum.UP,
  w: DirectionEnum.UP,
  ArrowDown: DirectionEnum.DOWN,
  s: DirectionEnum.DOWN,
};

export const RESET_KEYS: Set<string> = new Set<string>("r");
