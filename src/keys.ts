import {SearchType} from "./logic/search";
import {Directions} from "./logic/navigate";

export const SEARCH_KEYS: { [key: string]: SearchType } = {
  b: SearchType.BFS,
  f: SearchType.DFS,
}

export const MOVE_KEYS: { [key: string]: Directions } = {
  ArrowLeft: Directions.LEFT,
  a: Directions.LEFT,
  ArrowRight: Directions.RIGHT,
  d: Directions.RIGHT,
  ArrowUp: Directions.UP,
  w: Directions.UP,
  ArrowDown: Directions.DOWN,
  s: Directions.DOWN
}

export const RESET_KEYS: Set<string> = new Set<string>('r');
