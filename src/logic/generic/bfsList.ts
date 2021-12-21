import Worklist from "./worklist";

class BfsList<T> implements Worklist<T> {
  private array: T[][];
  constructor() {
    this.array = [];
  }

  removeNext(): T | null {
    if (this.array.length === 0) {
      return null;
    } else {
      let nextLevel = this.array.shift();
      while (nextLevel !== undefined && nextLevel.length < 1) {
        nextLevel = this.array.shift();
      }
      if (nextLevel === undefined) {
        return null;
      } else {
        const next = nextLevel.shift();
        if (next === undefined) {
          return null;
        } else if (nextLevel.length > 0) {
          this.array.unshift(nextLevel);
        }
        return next;
      }
    }
  }

  removeAll(): T[] {
    const all: T[] = [];
    this.array.forEach((level) => {
      level.forEach((item) => {
        all.push(item);
      });
    });
    this.array = [];
    return all;
  }

  add(item: T): void {
    this.array.push([item]);
  }

  addAll(items: T[]): void {
    this.array.push(items);
  }

  isEmpty(): boolean {
    return this.array.length === 0;
  }
}

export default BfsList;
