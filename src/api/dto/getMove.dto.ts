import { MazeDto, DirectionEnum } from './index';

export class GetMoveDto {
  readonly player: number;
  readonly maze: MazeDto;
  readonly direction: DirectionEnum;

  constructor(player: number, maze: MazeDto, direction: DirectionEnum) {
    this.player = player;
    this.maze = maze;
    this.direction = direction;
  }
}
