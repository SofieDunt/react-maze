import Posn from "./dataStructures/posn";
import Edge from "./edge";
import {FINISH_COLOR, STANDARD_COLOR, START_COLOR} from "../theme";

/**
 * A unique, colored node at an (x, y) position.
 */
export default interface Node {
  /**
   * Note that the node is discovered.
   */
  readonly discover: () => void;
  /**
   * Is there a path to the right neighbor or is this node at the edge?
   */
  readonly hasPathToRight: (edges: Edge[][], xDim: number) => boolean;
  /**
   * Is there a path to the bottom neighbor or is this node at the edge?
   */
  readonly hasPathToBottom: (edges: Edge[][], xDim: number, yDim: number) => boolean;
  /**
   * Return the position of the node.
   */
  readonly getPos: () => Posn;
  /**
   * Return the color of the node.
   */
  readonly getColor: () => string;
}

export enum NodeType {
  START, FINISH, UNDISCOVERED, FOUND
}

export class NodeImpl implements Node {
  private readonly id: number;
  private readonly pos: Posn;
  private type: NodeType;

  constructor(id: number, pos: Posn, type: NodeType) {
    this.id = id;
    this.type = type;
    this.pos = pos;
  }

  discover(): void {
    this.type = NodeType.FOUND;
  }

  hasPathToRight(edges: Edge[][], xDim: number): boolean {
    const outEdges = edges[this.id];
    let bool = this.pos.x % xDim + 1 === xDim;
    outEdges.forEach((edge) => {
      if (edge.getNodes().second === this.id + 1) {
        bool = true;
      }
    })
    return bool;
  }

  hasPathToBottom(edges: Edge[][], xDim: number, yDim: number): boolean {
    const outEdges = edges[this.id];
    let bool = this.pos.y % yDim + 1 === yDim;
    outEdges.forEach((edge) => {
      if (edge.getNodes().second === this.id + xDim) {
        bool = true;
      }
    })
    return bool;
  }

  getPos(): Posn {
    return this.pos;
  }

  getColor(): string {
    switch (this.type) {
      case NodeType.START:
        return START_COLOR;
      case NodeType.FINISH:
        return FINISH_COLOR;
      case NodeType.FOUND:
        return 'blue';
      case NodeType.UNDISCOVERED:
        return STANDARD_COLOR;
    }
  }
}
