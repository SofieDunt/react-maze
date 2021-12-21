import Comparator from "./comparator";

/**
 * A heap data structure.
 */
export default interface Heap<T> {
  /**
   * Returns the item at the given index, or null if there is none.
   */
  readonly lookup: (idx: number) => T | null;
  /**
   * Extracts the root of the heap and updates heap accordingly, or returns null if there is no root.
   */
  readonly extractRoot: () => T | null;
  /**
   * Inserts the item into the heap.
   */
  readonly insert: (item: T) => void;
}

/**
 * A node in a heap.
 */
export interface HeapNode<T> {
  readonly idx: number;
  readonly elem: T;
}

/**
 * A heap where the parent is less than its children.
 */
export class MinHeapImpl<T> implements Heap<T> {
  private readonly array: T[];
  private readonly comparator: Comparator<T>;

  constructor(comparator: Comparator<T>) {
    this.array = [];
    this.comparator = comparator;
  }

  /**
   * Gets the left child of the node.
   * @param idx the index of the node
   * @return the left child, or null if there is none
   */
  private getLeft(idx: number): HeapNode<T> | null {
    let leftIdx = 2 * idx - 1;
    if (idx === 0) {
      leftIdx = 1;
    }
    if (leftIdx < this.array.length) {
      return { idx: leftIdx, elem: this.array[leftIdx] };
    } else {
      return null;
    }
  }

  /**
   * Gets the right child of the node.
   * @param idx the index of the node
   * @return the right child, or null if there is none
   */
  private getRight(idx: number): HeapNode<T> | null {
    let rightIdx = 2 * idx;
    if (idx === 0) {
      rightIdx = 2;
    }
    if (rightIdx < this.array.length) {
      return { idx: rightIdx, elem: this.array[rightIdx] };
    } else {
      return null;
    }
  }

  /**
   * Gets the parent of the node.
   * @param idx the index of the node
   */
  private getParent(idx: number): HeapNode<T> | null {
    let parentIdx = Math.floor(idx / 2);
    if (parentIdx !== 0) {
      parentIdx -= 1;
    }
    if (parentIdx >= 0) {
      return { idx: parentIdx, elem: this.array[parentIdx] };
    } else {
      return null;
    }
  }

  /**
   * Swaps the items at the given indices in the array - does not update heap structure! Assumes both indices are valid.
   * @param first the first index
   * @param second the second index
   */
  private swap(first: number, second: number): void {
    const temp = this.array[first];
    this.array[first] = this.array[second];
    this.array[second] = temp;
  }

  /**
   * Down-heaps from the given index.
   * @param idx the index to down-heap from.
   */
  private downHeap(idx: number): void {
    const elem = this.array[idx];
    const left = this.getLeft(idx);
    if (left) {
      const right = this.getRight(idx);
      if (
        right &&
        this.comparator.compare(elem, right.elem) === 1 &&
        this.comparator.compare(right.elem, left.elem) === -1
      ) {
        this.swap(idx, right.idx);
        this.downHeap(right.idx);
      } else if (this.comparator.compare(elem, left.elem) === 1) {
        this.swap(idx, left.idx);
        this.downHeap(left.idx);
      }
    }
  }

  /**
   * Up-heaps from the given index.
   * @param idx the index to up-heap from
   */
  private upHeap(idx: number): void {
    const elem = this.array[idx];
    const parent = this.getParent(idx);
    if (parent && this.comparator.compare(elem, parent.elem) === -1) {
      this.swap(idx, parent.idx);
      this.upHeap(parent.idx);
    }
  }

  lookup(idx: number): T | null {
    if (idx >= 0 && idx < this.array.length) {
      return this.array[idx];
    } else {
      return null;
    }
  }

  extractRoot(): T | null {
    const root = this.array.shift();
    if (root) {
      const last = this.array.pop();
      if (last) {
        this.array.unshift(last);
      }
      this.downHeap(0);
      return root;
    } else {
      return null;
    }
  }

  insert(item: T): void {
    this.array.push(item);
    this.upHeap(this.array.length - 1);
  }
}
