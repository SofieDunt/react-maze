import Node, { node, NodeType } from "../node";
import Edge, { edge } from "../edge";
import { findParent, getRandomInt, IdMap, lolLength } from "../utils";
import { MinHeapImpl } from "../generic/heap";
import Maze, { maze } from "../maze";
import EdgeComparator from "./edgeComparator";
import { posn } from "../generic/posn";
import PosToNodeImpl from "./posToNodeImpl";

/**
 * Constructs every node in the board of the given dimensions.
 * @param xDim the x-dimension of the board
 * @param yDim the y-dimension of the board
 */
function constructNodes(xDim: number, yDim: number): Node[] {
  const nodes: Node[] = [];
  const numNodes = xDim * yDim;

  let id = 0;
  for (let row = 0; row < yDim; row++) {
    for (let col = 0; col < xDim; col++) {
      nodes.push(node(id, posn(col, row), NodeType.UNDISCOVERED));
      id++;
    }
  }

  nodes.shift();
  nodes.unshift(node(0, posn(0, 0), NodeType.START));
  nodes.pop();
  nodes.push(node(numNodes - 1, posn(xDim - 1, yDim - 1), NodeType.FINISH));
  return nodes;
}

/**
 * Constructs every potential (to right or to bottom) edge between the given nodes.
 * @param nodes the nodes in the board
 * @param xDim the x-dimension of the board
 * @param yDim the y-dimension of the board
 * @param horizontalCap the cap on horizontal edge weights
 * @param verticalCap the cap on vertical edge weights
 */
function constructEdges(
  nodes: Node[],
  xDim: number,
  yDim: number,
  horizontalCap: number,
  verticalCap: number
): Edge[][] {
  const edges: Edge[][] = [];
  nodes.forEach((node: Node, id) => {
    const nodeEdges = [];
    const pos = node.pos;
    // right neighbor
    if ((pos.x % xDim) + 1 < xDim) {
      nodeEdges.push(edge(id, id + 1, getRandomInt(horizontalCap)));
    }
    // bottom neighbor
    if ((pos.y % yDim) + 1 < yDim) {
      nodeEdges.push(edge(id, id + xDim, getRandomInt(verticalCap)));
    }
    edges.push(nodeEdges);
  });
  return edges;
}

/**
 * Is this edge part of a cycle?
 * @param parents the parents of each node
 * @param edge the edge
 */
export function cycles(parents: IdMap, edge: Edge): boolean {
  return findParent(parents, edge.first) === findParent(parents, edge.second);
}

/**
 * Uses Kruskal's to make an MST from all potential edges.
 * @param edges all potential edges in the board
 * @param numNodes the number of nodes in the board
 */
function constructMST(edges: Edge[][], numNodes: number): Edge[][] {
  const numTreeEdges = numNodes - 1;
  const treeEdges: Edge[][] = [];
  const parents = new Map<number, number>();
  edges.forEach((es, id) => parents.set(id, id));
  const worklist = new MinHeapImpl(new EdgeComparator());
  edges.forEach((es) => {
    treeEdges.push([]);
    es.forEach((edge) => {
      worklist.insert(edge);
    });
  });

  while (lolLength(treeEdges) < numTreeEdges * 2) {
    const nextEdge = worklist.extractRoot();
    if (nextEdge && !cycles(parents, nextEdge)) {
      treeEdges[nextEdge.first].push(nextEdge);
      treeEdges[nextEdge.second].push(
        edge(nextEdge.second, nextEdge.first, nextEdge.weight)
      );
      parents.set(
        findParent(parents, nextEdge.first),
        findParent(parents, nextEdge.second)
      );
    }
  }

  return treeEdges;
}

export default function constructMaze(
  xDim: number,
  yDim: number,
  bias: number
): Maze {
  let horizontalCap = 100;
  let verticalCap = 100;
  if (bias < 0) {
    horizontalCap = 50;
    verticalCap = 100 * Math.abs(bias);
  } else if (bias > 0) {
    horizontalCap = 100 * bias;
    verticalCap = 50;
  }

  const nodes = constructNodes(xDim, yDim);
  const edges = constructMST(
    constructEdges(nodes, xDim, yDim, horizontalCap, verticalCap),
    nodes.length
  );
  return maze(nodes, edges, xDim, yDim, new PosToNodeImpl(xDim));
}
