import Edge from "./edge";
import Comparator from "./dataStructures/comparator";

/**
 * Compares edges by their weight.
 */
class EdgeComparator implements Comparator<Edge> {
  compare(one: Edge, two: Edge): number {
    if (one.weight === two.weight) {
      return 0;
    } else if (one.weight < two.weight) {
      return -1;
    } else {
      return 1;
    }
  }
}

export default EdgeComparator;
