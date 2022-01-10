export class GetMazeDto {
  readonly xDim: number;
  readonly yDim: number;
  readonly bias: number;

  constructor(xDim: number, yDim: number, bias: number) {
    this.xDim = xDim;
    this.yDim = yDim;
    this.bias = bias;
  }
}
