import {MazeConstructor, MazeConstructorImpl} from "../mazeConstructor";
import {lolLength} from "../utils";

describe('MazeConstructor tests', () => {
  function mConstructor(xDim: number, yDim: number, bias: number): MazeConstructor {
    return new MazeConstructorImpl(xDim, yDim, bias);
  }

  it ('constructs all nodes', () => {
    const m1 = mConstructor(5, 5, 0).construct();
    const m2 = mConstructor(10, 10, -1).construct();
    const m3 = mConstructor(20, 20, 100).construct();
    expect(m1.nodes.length).toEqual(25);
    expect(m2.nodes.length).toEqual(100);
    expect(m3.nodes.length).toEqual(400);
  })

  it('constructs MST', () => {
    const m1 = mConstructor(5, 5, 0).construct();
    const m2 = mConstructor(10, 10, -1).construct();
    const m3 = mConstructor(20, 20, 100).construct();

    expect(m1.edges.length).toEqual(25);
    expect(m2.edges.length).toEqual(100);
    expect(m3.edges.length).toEqual(400);
    expect(lolLength(m1.edges)).toEqual(24);
    expect(lolLength(m2.edges)).toEqual(99);
    expect(lolLength(m3.edges)).toEqual(399);
  })
})
