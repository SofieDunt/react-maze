import Node from "./node";
import Edge from "./edge";

/**
 * A maze, represented as a graph with nodes arranged in a grid.
 */
export default interface Maze {
  readonly nodes: Node[];
  readonly edges: Edge[][];
  readonly xDim: number;
  readonly yDim: number;
}

export function maze(nodes: Node[], edges: Edge[][], xDim: number, yDim: number): Maze {
  return { nodes, edges, xDim, yDim };
}
