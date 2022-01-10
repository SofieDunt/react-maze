import { PosnDto } from './index';

export class MazeNodeDto {
  readonly id: number;
  readonly posn: PosnDto;
  readonly hasPathToRight: boolean;
  readonly hasPathToBottom: boolean;

  constructor(
    id: number,
    posn: PosnDto,
    hasPathToRight: boolean,
    hasPathToBottom: boolean,
  ) {
    this.id = id;
    this.posn = posn;
    this.hasPathToRight = hasPathToRight;
    this.hasPathToBottom = hasPathToBottom;
  }
}
