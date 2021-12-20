import {findParent, IdMap} from "./utils";
import Pair from "./dataStructures/pair";

/**
 * A directed, weighted edge between two nodes.
 */
export default interface Edge {
  /**
   * Returns true if this edge creates a cycle, false if otherwise.
   */
  readonly cycles: (parents: IdMap) => boolean;
  /**
   * Returns the nodes connected by the edgee.
   */
  readonly getNodes: () => Pair<number, number>;
  /**
   * Returns the weight of the edge.
   */
  readonly getWeight: () => number;
}

export class EdgeImpl implements Edge {
  private readonly first: number;
  private readonly second: number;
  private readonly weight: number;

  constructor(first: number, second: number, weight: number) {
    this.first = first;
    this.second = second;
    this.weight = weight;
  }

  cycles(parents: IdMap): boolean {
    return findParent(parents, this.first) === findParent(parents, this.second);
  }

  getNodes(): Pair<number, number> {
    return { first: this.first, second: this.second };
  }

  getWeight(): number {
    return this.weight;
  }
}
