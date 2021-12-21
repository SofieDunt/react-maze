import constructMaze from "../constructMaze";
import { lolLength } from "../utils";

describe("MazeConstructor tests", () => {
  it("constructs all nodes", () => {
    const m1 = constructMaze(5, 5, 0);
    const m2 = constructMaze(10, 10, -1);
    const m3 = constructMaze(20, 20, 100);
    expect(m1.nodes.length).toEqual(25);
    expect(m2.nodes.length).toEqual(100);
    expect(m3.nodes.length).toEqual(400);
  });

  it("constructs MST", () => {
    const m1 = constructMaze(5, 5, 0);
    const m2 = constructMaze(10, 10, -1);
    const m3 = constructMaze(20, 20, 100);

    expect(m1.edges.length).toEqual(25);
    expect(m2.edges.length).toEqual(100);
    expect(m3.edges.length).toEqual(400);
    expect(lolLength(m1.edges)).toEqual(24);
    expect(lolLength(m2.edges)).toEqual(99);
    expect(lolLength(m3.edges)).toEqual(399);
  });
});
