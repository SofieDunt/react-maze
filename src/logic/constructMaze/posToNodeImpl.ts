import { PosToNode } from "../maze";
import Posn from "../generic/posn";

export default class PosToNodeImpl implements PosToNode {
  private readonly xDim: number;
  constructor(xDim: number) {
    this.xDim = xDim;
  }

  find(pos: Posn): number {
    return pos.x + pos.y * this.xDim;
  }
}
