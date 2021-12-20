import Posn from "./dataStructures/posn";
import {FINISH_COLOR, STANDARD_COLOR, START_COLOR} from "../theme";

/**
 * A unique node at an (x, y) position.
 */
export default interface Node {
  readonly id: number;
  readonly pos: Posn;
  readonly type: NodeType;
}

export enum NodeType {
  START, FINISH, UNDISCOVERED, FOUND
}

export function node(id: number, pos: Posn, type: NodeType): Node {
  return { id, pos, type };
}
