import { DirectionEnum, MazeDto } from '../../api/dto';

class Navigator {
  static move(player: number, maze: MazeDto, direction: DirectionEnum): number {
    let movedPlayer = player;
    if (Navigator.canMove(player, maze, direction)) {
      switch (direction) {
        case DirectionEnum.LEFT:
          movedPlayer = player - 1;
          break;
        case DirectionEnum.RIGHT:
          movedPlayer = player + 1;
          break;
        case DirectionEnum.UP:
          movedPlayer = player - maze.xDim;
          break;
        case DirectionEnum.DOWN:
          movedPlayer = player + maze.xDim;
          break;
      }
    }
    return movedPlayer;
  }

  static canMove(
    player: number,
    maze: MazeDto,
    direction: DirectionEnum,
  ): boolean {
    const posn = maze.nodes[player].posn;
    switch (direction) {
      case DirectionEnum.LEFT:
        return posn.x - 1 >= 0 && maze.nodes[player - 1].hasPathToRight;
      case DirectionEnum.RIGHT:
        return posn.x + 1 < maze.xDim && maze.nodes[player].hasPathToRight;
      case DirectionEnum.UP:
        return (
          posn.y - 1 >= 0 && maze.nodes[player - maze.xDim].hasPathToBottom
        );
      case DirectionEnum.DOWN:
        return posn.y + 1 < maze.yDim && maze.nodes[player].hasPathToBottom;
      default:
        return false;
    }
  }
}

export default Navigator;
