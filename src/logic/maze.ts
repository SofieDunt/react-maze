import Node from "./node";
import Edge from "./edge";

/**
 * A maze, represented as a graph.
 */
export default interface Maze {
  readonly nodes: Node[];
  readonly edges: Edge[][];
}
