import { PosnDto, MazeDto, DirectionEnum } from './index';

export class GetMoveDto {
  readonly player: PosnDto;
  readonly maze: MazeDto;
  readonly direction: DirectionEnum;

  constructor(player: PosnDto, maze: MazeDto, direction: DirectionEnum) {
    this.player = player;
    this.maze = maze;
    this.direction = direction;
  }
}
