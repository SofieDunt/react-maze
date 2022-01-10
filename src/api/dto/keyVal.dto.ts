export class KeyValDto {
  readonly key: number;
  readonly val: number;

  constructor(key: number, val: number) {
    this.key = key;
    this.val = val;
  }
}
