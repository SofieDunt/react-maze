export default interface Worklist<T> {
  readonly removeNext: () => T | null;
  readonly removeAll: () => T[];
  readonly add: (item: T) => void;
  readonly addAll: (items: T[]) => void;
  readonly isEmpty: () => boolean;
}
