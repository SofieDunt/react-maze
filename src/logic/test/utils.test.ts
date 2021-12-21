import { findParent, getRandomInt, lolLength } from "../utils";

describe("Utils tests", () => {
  it("finds parent and updates parents accordingly", () => {
    const parents = new Map<number, number>();
    parents.set(1, 1);
    parents.set(2, 1);
    parents.set(3, 2);
    parents.set(4, 2);
    parents.set(5, 4);

    expect(findParent(parents, 5)).toEqual(1);
    expect(parents.get(5)).toEqual(1);
    expect(parents.get(4)).toEqual(1);
    expect(parents.get(3)).toEqual(2);
    expect(findParent(parents, 3)).toEqual(1);
    expect(parents.get(3)).toEqual(1);
  });

  it("generates a random number below the cap", () => {
    const caps = [10, 50, 98, 107];
    caps.forEach((cap) => {
      for (let i = 0; i < 1000; i++) {
        const rand = getRandomInt(cap);
        expect(rand < cap).toBeTruthy();
        expect(Number.isInteger(rand)).toBeTruthy();
      }
    });
  });

  it("counts all items in a lol", () => {
    const lol1: string[][] = [];
    const lol2 = [[], [], []];
    const lol3 = [[1], [], [2, 3], [4, 5, 6, 7]];
    expect(lolLength(lol1)).toEqual(0);
    expect(lolLength(lol2)).toEqual(0);
    expect(lolLength(lol3)).toEqual(7);
  });
});
