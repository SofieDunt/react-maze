import Node, {NodeImpl, NodeType} from "./node";
import Edge, {EdgeImpl} from "./edge";
import Posn from "./dataStructures/posn";
import {findParent, getRandomInt, lolLength} from "./utils";
import {MinHeapImpl} from "./dataStructures/heap";
import Maze from "./maze";
import EdgeComparator from "./edgeComparator";

/**
 * Constructs a maze.
 */
export interface MazeConstructor {
  /**
   * Constructs a maze.
   */
  readonly construct: () => Maze;
}

export class MazeConstructorImpl implements MazeConstructor {
  private readonly xDim: number;
  private readonly yDim: number;
  private readonly horizontalCap: number;
  private readonly verticalCap: number;

  constructor(xDim: number, yDim: number, bias: number) {
    this.xDim = xDim;
    this.yDim = yDim;
    if (bias === 0) {
      this.horizontalCap = 100;
      this.verticalCap = 100;
    } else if (bias < 0) {
      this.horizontalCap = 50;
      this.verticalCap = 100 * Math.abs(bias);
    } else {
      this.horizontalCap = 100 * bias;
      this.verticalCap = 50;
    }
  }

  /**
   * Creates and returns a node.
   * @param id the node id
   * @param pos the node position
   * @param type the node type
   */
  private static node(id: number, pos: Posn, type: NodeType): Node {
    return new NodeImpl(id, pos, type);
  }

  /**
   * Constructs every node in the board.
   */
  private constructNodes(): Node[] {
    const nodes: Node[] = [];
    const numNodes = this.xDim * this.yDim;

    let id = 0;
    for (let row = 0; row < this.yDim; row++) {
      for (let col = 0; col < this.xDim; col++) {
        nodes.push(MazeConstructorImpl.node(id, { x: col, y: row }, NodeType.UNDISCOVERED));
        id++;
      }
    }

    nodes.shift();
    nodes.unshift(MazeConstructorImpl.node(0, { x: 0, y: 0 }, NodeType.START));
    nodes.pop();
    nodes.push(MazeConstructorImpl.node(numNodes - 1, { x: this.xDim -1, y: this.yDim - 1 }, NodeType.FINISH));
    return nodes;
  }

  /**
   * Constructs every potential edge in the board.
   * @param nodes the nodes in the board
   */
  private constructEdges(nodes: Node[]): Edge[][] {
    const edges: Edge[][] = [];
    nodes.forEach((node: Node, id) => {
      const nodeEdges = [];
      const pos = node.getPos();
      // right neighbor
      if (pos.x % this.xDim + 1 < this.xDim) {
        nodeEdges.push(new EdgeImpl(id, id + 1, getRandomInt(this.horizontalCap)));
      }
      // bottom neighbor
      if (pos.y % this.yDim + 1 < this.yDim) {
        nodeEdges.push(new EdgeImpl(id, id + this.xDim, getRandomInt(this.verticalCap)));
      }
      edges.push(nodeEdges);
    });
    return edges;
  }

  /**
   * Uses Kruskal's to make an MST from all potential edges.
   * @param edges all potential edges in the board
   */
  private makeSpanningTree(edges: Edge[][]): Edge[][] {
    const numTreeEdges = this.xDim * this.yDim - 1;
    const treeEdges: Edge[][] = [];
    const parents = new Map<number, number>();
    edges.forEach((es, id) => parents.set(id, id));
    const worklist = new MinHeapImpl(new EdgeComparator());
    edges.forEach((es) => {
      treeEdges.push([]);
      es.forEach((edge) => {
        worklist.insert(edge);
      })
    });

    while (lolLength(treeEdges) < numTreeEdges) {
      const nextEdge = worklist.extractRoot();
      if (nextEdge && !nextEdge.cycles(parents)) {
        const pair = nextEdge.getNodes();
        treeEdges[pair.first].push(nextEdge);
        parents.set(findParent(parents, pair.first), findParent(parents, pair.second));
      }
    }

    return treeEdges;
  }

  construct(): Maze {
    const nodes = this.constructNodes();
    const edges = this.makeSpanningTree(this.constructEdges(nodes));
    return { nodes, edges };
  }
}
