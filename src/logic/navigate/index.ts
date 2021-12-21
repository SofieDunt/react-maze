import Posn, { posn } from "../generic/posn";
import Maze from "../maze";
import Node from "../node";

export enum Directions {
  LEFT,
  RIGHT,
  UP,
  DOWN,
}

export function hasPathToRight(node: Node, maze: Maze): boolean {
  const outEdges = maze.edges[node.id];
  let bool = (node.pos.x % maze.xDim) + 1 === maze.xDim;
  outEdges.forEach((edge) => {
    if (edge.second === node.id + 1) {
      bool = true;
    }
  });
  return bool;
}

export function hasPathToBottom(node: Node, maze: Maze): boolean {
  const outEdges = maze.edges[node.id];
  let bool = (node.pos.y % maze.yDim) + 1 === maze.yDim;
  outEdges.forEach((edge) => {
    if (edge.second === node.id + maze.xDim) {
      bool = true;
    }
  });
  return bool;
}

export const canMove = (
  player: Posn,
  maze: Maze,
  direction: Directions
): boolean => {
  switch (direction) {
    case Directions.LEFT:
      return (
        player.x - 1 >= 0 &&
        hasPathToRight(maze.nodes[maze.posToNode.find(player) - 1], maze)
      );
    case Directions.RIGHT:
      return (
        player.x + 1 < maze.xDim &&
        hasPathToRight(maze.nodes[maze.posToNode.find(player)], maze)
      );
    case Directions.UP:
      return (
        player.y - 1 >= 0 &&
        hasPathToBottom(
          maze.nodes[maze.posToNode.find(player) - maze.xDim],
          maze
        )
      );
    case Directions.DOWN:
      return (
        player.y + 1 < maze.yDim &&
        hasPathToBottom(maze.nodes[maze.posToNode.find(player)], maze)
      );
    default:
      return false;
  }
};
export const move = (player: Posn, maze: Maze, direction: Directions): Posn => {
  if (canMove(player, maze, direction)) {
    switch (direction) {
      case Directions.LEFT:
        return posn(player.x - 1, player.y);
      case Directions.RIGHT:
        return posn(player.x + 1, player.y);
      case Directions.UP:
        return posn(player.x, player.y - 1);
      case Directions.DOWN:
        return posn(player.x, player.y + 1);
      default:
        return player;
    }
  } else {
    return player;
  }
};
