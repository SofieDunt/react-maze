import { MazeDto, SearchTypeEnum } from './index';

export class GetSearchDto {
  readonly maze: MazeDto;
  readonly type: SearchTypeEnum;
  readonly source: number;
  readonly target: number;

  constructor(
    maze: MazeDto,
    type: SearchTypeEnum,
    source: number,
    target: number,
  ) {
    this.maze = maze;
    this.type = type;
    this.source = source;
    this.target = target;
  }
}
