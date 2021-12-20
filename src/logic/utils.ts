import Posn from "./dataStructures/posn";
import Maze from "./maze";
import Edge from "./edge";
import Node from "./node";

export type IdMap = Map<number, number>;

export function findParent(parents: IdMap, nodeId: number): number {
  let parent = parents.get(nodeId);
  while (parent && nodeId !== parent) {
    const grandparent = findParent(parents, parent);
    if (grandparent) {
      parents.set(nodeId, grandparent);
    }
    nodeId = parent;
    parent = parents.get(nodeId);
  }
  return nodeId;
}

export function cycles(parents: IdMap, edge: Edge): boolean {
  return findParent(parents, edge.first) === findParent(parents, edge.second);
}

export function hasPathToRight(node: Node, maze: Maze): boolean {
  const outEdges = maze.edges[node.id];
  let bool = node.pos.x % maze.xDim + 1 === maze.xDim;
  outEdges.forEach((edge) => {
    if (edge.second === node.id + 1) {
      bool = true;
    }
  })
  return bool;
}

export function hasPathToBottom(node: Node, maze: Maze): boolean {
  const outEdges = maze.edges[node.id];
  let bool = node.pos.y % maze.yDim + 1 === maze.yDim;
  outEdges.forEach((edge) => {
    if (edge.second === node.id + maze.xDim) {
      bool = true;
    }
  })
  return bool;
}

export function getRandomInt(cap: number): number {
  return Math.floor(Math.random() * cap);
}

export function lolLength<T>(lol: T[][]): number {
  let sum = 0;
  lol.forEach((l) => {
    sum += l.length;
  })
  return sum;
}

export function nodeFromPosn(pos: Posn, xDim: number): number {
  return pos.x + pos.y * xDim;
}

export function canMoveUp(pos: Posn, maze: Maze): boolean {
  const up = pos.y - 1;
  return up >= 0 && hasPathToBottom(maze.nodes[nodeFromPosn(pos, maze.xDim) - maze.xDim], maze);
}

export function canMoveDown(pos: Posn, maze: Maze): boolean {
  const down = pos.y + 1;
  return down < maze.yDim && hasPathToBottom(maze.nodes[nodeFromPosn(pos, maze.xDim)], maze);
}

export function canMoveLeft(pos: Posn, maze: Maze): boolean {
  const left = pos.x - 1;
  return left >= 0 && hasPathToRight(maze.nodes[nodeFromPosn(pos, maze.xDim) - 1], maze);
}

export function canMoveRight(pos: Posn, maze: Maze): boolean {
  const right = pos.x + 1;
  return right < maze.xDim && hasPathToRight(maze.nodes[nodeFromPosn(pos, maze.xDim)], maze);
}
