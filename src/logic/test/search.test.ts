import {bfsFinish, dfsFinish} from "../search";
import Maze from "../maze";
import {node, NodeType} from "../node";
import {posn} from "../generic/posn";
import {edge} from "../edge";
import PosToNodeImpl from "../constructMaze/posToNodeImpl";

describe('search tests', () => {
  it('basic search correctly', () => {
    const maze: Maze = {
      nodes: [
          node(0, posn(0, 0), NodeType.START),
        node(1, posn(1, 0), NodeType.UNDISCOVERED),
        node(2, posn(0, 1), NodeType.UNDISCOVERED),
        node(3, posn(1, 1), NodeType.FINISH),
      ],
      edges: [
          [edge(0, 1, 1)],
          [edge(1, 0, 1), edge(1, 3, 1)],
          [edge(2, 4, 1)],
          [edge(3, 1, 1), edge(3, 2, 1)],
      ],
      xDim: 2,
      yDim: 2,
      posToNode: new PosToNodeImpl(2),
    };
    const bRes = bfsFinish(maze);
    expect(bRes.found).toEqual([0, 1, 3]);
    expect(bRes.path).toEqual([0, 1, 3]);
    const dRes = dfsFinish(maze);
    expect(dRes).toEqual(bRes);
  })
})
