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
  });
  return sum;
}
