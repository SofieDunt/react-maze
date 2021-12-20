import Worklist from "./worklist";

class LifoList<T> implements Worklist<T>{
  private array: T[];

  constructor() {
    this.array = [];
  }

  removeNext(): T | null {
    const next = this.array.pop();
    if (next !== undefined) {
      return next;
    } else {
      return null;
    }
  };

  removeAll(): T[] {
    const all = this.array;
    this.array = [];
    return all;
  }

  add(item: T): void {
    this.array.push(item);
  }

  addAll(items: T[]): void {
    items.forEach((item) => {
      this.array.push(item);
    })
  }

  isEmpty(): boolean {
    return this.array.length === 0;
  }
}

export default LifoList;
