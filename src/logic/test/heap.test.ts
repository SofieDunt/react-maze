import {MinHeapImpl} from "../dataStructures/heap";
import Comparator from "../dataStructures/comparator";

describe('Heap tests', () => {
  class NumericComparator implements Comparator<number> {
    compare(one: number, two: number): number {
      if (one === two) {
        return 0;
      } else if (one < two) {
        return -1;
      } else {
        return 1;
      }
    }
  }

  function heap() {
    return new MinHeapImpl<number>(new NumericComparator());
  }

  it('inserts correctly', () => {
    const h = heap();
    const elems = [1, 2, 5, 10, 3, 7, 11, 15, 17, 20];
    elems.forEach((elem) => h.insert(elem));

    function checkSame() {
      expect(h.lookup(2)).toEqual(5);
      expect(h.lookup(3)).toEqual(10);
      expect(h.lookup(5)).toEqual(7);
      expect(h.lookup(6)).toEqual(11);
      expect(h.lookup(7)).toEqual(15);
      expect(h.lookup(8)).toEqual(17);
      expect(h.lookup(9)).toEqual(20);
    }

    expect(h.lookup(0)).toEqual(1);
    expect(h.lookup(1)).toEqual(2);
    expect(h.lookup(4)).toEqual(3);
    checkSame();

    h.insert(0);

    expect(h.lookup(0)).toEqual(0);
    expect(h.lookup(1)).toEqual(1);
    expect(h.lookup(4)).toEqual(2);
    expect(h.lookup(10)).toEqual(3);
    checkSame();
  })

  it('extracts min correctly', () => {
    const h = heap();

    const elems = [1, 2, 5, 10, 3, 7, 11, 15, 17, 20];
    elems.forEach((elem) => h.insert(elem));

    expect(h.lookup(0)).toEqual(1);
    const root = h.extractRoot();
    expect(root).toEqual(1);
    expect(h.lookup(0)).toEqual(2);
    expect(h.lookup(1)).toEqual(5);
    expect(h.lookup(2)).toEqual(3);
    expect(h.lookup(3)).toEqual(10);
    expect(h.lookup(4)).toEqual(15);
    expect(h.lookup(5)).toEqual(7);
    expect(h.lookup(6)).toEqual(11);
    expect(h.lookup(7)).toEqual(20);
    expect(h.lookup(8)).toEqual(17);
  })
})
