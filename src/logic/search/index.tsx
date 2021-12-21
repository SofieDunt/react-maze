import Worklist from "../generic/worklist";
import Maze from "../maze";
import {IdMap} from "../utils";
import BfsList from "../generic/bfsList";
import {posn} from "../generic/posn";
import LifoList from "../generic/lifoList";

export enum SearchType {
  NONE, BFS, DFS
}

export const searchWorklist = (type: SearchType, first: number): Worklist<number> => {
  let n: Worklist<number>;
  if (type === SearchType.BFS) {
    n = new BfsList<number>();
  } else {
    n = new LifoList<number>();
  }
  if (type !== SearchType.NONE) {
    n.add(first);
  }
  return n;
}

export interface SearchResult {
  readonly found: IdMap;
  readonly path: IdMap;
}

export function searchFromSource(type: SearchType, maze: Maze, source: number, target: number): SearchResult {
  const worklist = searchWorklist(type, source);
  return search(worklist, maze, target);
}

export function bfsFinish(maze: Maze): SearchResult {
  const worklist = new BfsList<number>();
  worklist.add(0);
  return search(worklist, maze, maze.posToNode.find(posn(maze.xDim - 1, maze.yDim - 1)));
}

export function dfsFinish(maze: Maze): SearchResult {
  const worklist = new LifoList<number>();
  worklist.add(0);
  return search(worklist, maze, maze.posToNode.find(posn(maze.xDim - 1, maze.yDim - 1)));
}

export function search(worklist: Worklist<number>, maze: Maze, target: number): SearchResult {
  const found: IdMap = new Map<number, number>();
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

export function searchNode(worklist: Worklist<number>, maze: Maze, target: number, found: IdMap, parents: IdMap): void {
  const next = worklist.removeNext();
  if (next !== null && !found.has(next)) {
    found.set(next, found.size + 1);
    if (next === target) {
      worklist.removeAll();
    } else {
      const nodesToProcess = getNodeNeighbors(next, maze);
      nodesToProcess.filter((neighbor) => !found.has(neighbor));
      nodesToProcess.forEach((neighbor) => {
        if (!found.has(neighbor)) {
          worklist.add(neighbor);
          parents.set(neighbor, next);
        }
      })
    }
  }
}

export function reconstructPath(parents: IdMap, maze: Maze, target: number): IdMap {
  const path = new Map<number, number>();
  let at = target;
  let order = 0;
  while (at !== 0) {
    path.set(at, order);
    const parent = parents.get(at);
    if (parent !== undefined) {
      at = parent;
      order++;
    }
  }
  path.set(at, order);
  return path;
}
