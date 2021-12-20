import Posn from "../generic/posn";
import Maze from "../maze";
import Node from "../node";

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

export function canMoveUp(pos: Posn, maze: Maze): boolean {
  const up = pos.y - 1;
  return up >= 0 && hasPathToBottom(maze.nodes[maze.posToNode(pos, maze.xDim) - maze.xDim], maze);
}

export function canMoveDown(pos: Posn, maze: Maze): boolean {
  const down = pos.y + 1;
  return down < maze.yDim && hasPathToBottom(maze.nodes[maze.posToNode(pos, maze.xDim)], maze);
}

export function canMoveLeft(pos: Posn, maze: Maze): boolean {
  const left = pos.x - 1;
  return left >= 0 && hasPathToRight(maze.nodes[maze.posToNode(pos, maze.xDim) - 1], maze);
}

export function canMoveRight(pos: Posn, maze: Maze): boolean {
  const right = pos.x + 1;
  return right < maze.xDim && hasPathToRight(maze.nodes[maze.posToNode(pos, maze.xDim)], maze);
}
