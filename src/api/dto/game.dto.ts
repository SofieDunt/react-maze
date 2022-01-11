import { MazeDto, SearchDto } from './index';

export class GameDto {
  readonly maze: MazeDto;
  readonly bfsSearch: SearchDto;
  readonly dfsSearch: SearchDto;

  constructor(maze: MazeDto, bfsSearch: SearchDto, dfsSearch: SearchDto) {
    this.maze = maze;
    this.bfsSearch = bfsSearch;
    this.dfsSearch = dfsSearch;
  }
}
