import Worklist from "../generic/worklist";
import Maze from "../maze";
import {IdMap} from "../utils";
import BfsList from "../generic/bfsList";
import {posn} from "../generic/posn";
import LifoList from "../generic/lifoList";

export interface SearchResult {
  readonly found: number[];
  readonly path: number[];
}

export function bfsFinish(maze: Maze) {
  const worklist = new BfsList<number>();
  worklist.add(0);
  return search(worklist, maze, maze.posToNode.find(posn(maze.xDim - 1, maze.yDim - 1)));
}

export function dfsFinish(maze: Maze) {
  const worklist = new LifoList<number>();
  worklist.add(0);
  return search(worklist, maze, maze.posToNode.find(posn(maze.xDim - 1, maze.yDim - 1)));
}

export function search(worklist: Worklist<number>, maze: Maze, target: number): SearchResult {
  const found: number[] = [];
  const parents: IdMap = new Map<number, number>();

  while (!worklist.isEmpty()) {
    searchNode(worklist, maze, target, found, parents);
  }

  return { found, path: reconstructPath(parents, maze, target) };
}

function getNodeNeighbors(node: number, maze: Maze): number[] {
  const neighbors: number[] = [];
  maze.edges[node].forEach((edge) => {
    neighbors.push(edge.second);
  })
  return neighbors;
}

function searchNode(worklist: Worklist<number>, maze: Maze, target: number, found: number[], parents: IdMap): void {
  const next = worklist.removeNext();
  if (next !== null && !found.includes(next)) {
    found.push(next);
    if (next === target) {
      worklist.removeAll();
    } else {
      const nodesToProcess = getNodeNeighbors(next, maze);
      nodesToProcess.filter((neighbor) => !found.includes(neighbor));
      nodesToProcess.forEach((neighbor) => {
        if (!found.includes(neighbor)) {
          worklist.add(neighbor);
          parents.set(neighbor, next);
        }
      })
    }
  }
}

function reconstructPath(parents: IdMap, maze: Maze, target: number): number[] {
  const path = [];
  let at = target;
  while (at !== 0) {
    path.unshift(at);
    const parent = parents.get(at);
    if (parent !== undefined) {
      at = parent;
    }
  }
  path.unshift(at);
  return path;
}
