/**
 * A function object for comparing two objects.
 */
interface Comparator<T> {
  /**
   * Returns 0 if one equals two, -1 if 1 < 2, 1 if 1 > 2.
   */
  readonly compare: (one: T, two: T) => number;
}

export default Comparator;
