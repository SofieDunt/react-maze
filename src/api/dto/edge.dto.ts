export class EdgeDto {
  readonly first: number;
  readonly second: number;
  readonly weight: number;

  constructor(first: number, second: number, weight: number) {
    this.first = first;
    this.second = second;
    this.weight = weight;
  }
}
