import Edge from "./edge";
import Comparator from "./dataStructures/comparator";

/**
 * Compares edges by their weight.
 */
class EdgeComparator implements Comparator<Edge> {
  compare(one: Edge, two: Edge): number {
    const oneWeight = one.getWeight();
    const twoWeight = two.getWeight();
    if (oneWeight === twoWeight) {
      return 0;
    } else if (oneWeight < twoWeight) {
      return -1;
    } else {
      return 1;
    }
  }
}

export default EdgeComparator;
