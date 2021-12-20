import Node from "./node";
import Edge from "./edge";
import Posn from "./generic/posn";

/**
 * A maze, represented as a graph with nodes arranged in a grid.
 */
export default interface Maze {
  readonly nodes: Node[];
  readonly edges: Edge[][];
  readonly xDim: number;
  readonly yDim: number;
  readonly posToNode: PosToNode;
}

export function maze(nodes: Node[], edges: Edge[][], xDim: number, yDim: number, posToNode: PosToNode): Maze {
  return { nodes, edges, xDim, yDim, posToNode };
}

export interface PosToNode {
  readonly find: (pos: Posn) => number;
}
