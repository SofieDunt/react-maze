import { MazeDto } from '../api/dto';

export interface ScaledDisplayProps {
  readonly cellDim: number;
}

export interface MazeComponentDisplayProps extends ScaledDisplayProps {
  readonly maze: MazeDto;
}

export enum MazeNodeDisplayState {
  STANDARD,
  PLAYER_FOUND,
  FOUND,
  PATH,
}
