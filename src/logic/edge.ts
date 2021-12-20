/**
 * A directed, weighted edge between two nodes.
 */
export default interface Edge {
  readonly first: number;
  readonly second: number;
  readonly weight: number;
}

export function edge(first: number, second: number, weight: number): Edge {
  return { first, second, weight };
}
