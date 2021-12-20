import Posn from "./dataStructures/posn";
import Maze from "./maze";

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

export function canMoveUp(pos: Posn, maze: Maze, xDim: number, yDim: number): boolean {
  const up = pos.y - 1;
  return up >= 0 && maze.nodes[nodeFromPosn(pos, xDim) - xDim].hasPathToBottom(maze.edges, xDim, yDim);
}

export function canMoveDown(pos: Posn, maze: Maze, xDim: number, yDim: number): boolean {
  const down = pos.y + 1;
  return down < yDim && maze.nodes[nodeFromPosn(pos, xDim)].hasPathToBottom(maze.edges, xDim, yDim);
}

export function canMoveLeft(pos: Posn, maze: Maze, xDim: number): boolean {
  const left = pos.x - 1;
  return left >= 0 && maze.nodes[nodeFromPosn(pos, xDim) - 1].hasPathToRight(maze.edges, xDim);
}

export function canMoveRight(pos: Posn, maze: Maze, xDim: number): boolean {
  const right = pos.x + 1;
  return right < xDim && maze.nodes[nodeFromPosn(pos, xDim)].hasPathToRight(maze.edges, xDim);
}
