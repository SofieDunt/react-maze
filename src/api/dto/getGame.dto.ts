export class GetGameDto {
  readonly xDim: number;
  readonly yDim: number;
  readonly bias: number;
  readonly source: number;
  readonly target: number;

  constructor(
    xDim: number,
    yDim: number,
    bias: number,
    source: number,
    target: number,
  ) {
    this.xDim = xDim;
    this.yDim = yDim;
    this.bias = bias;
    this.source = source;
    this.target = target;
  }
}
