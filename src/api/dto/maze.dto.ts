import { EdgeDto, MazeNodeDto } from './index';

export class MazeDto {
  readonly xDim: number;
  readonly yDim: number;
  readonly bias: number;
  readonly nodes: MazeNodeDto[];
  readonly edges: EdgeDto[][];

  constructor(
    xDim: number,
    yDim: number,
    bias: number,
    nodes: MazeNodeDto[],
    edges: EdgeDto[][],
  ) {
    this.xDim = xDim;
    this.yDim = yDim;
    this.bias = bias;
    this.nodes = nodes;
    this.edges = edges;
  }
}
