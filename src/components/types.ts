import { MazeDto } from '../api/dto';

export interface ScaledDisplayProps {
  readonly cellDim: number;
}

export interface MazeComponentDisplayProps extends ScaledDisplayProps {
  readonly maze: MazeDto;
}

export const getCellDim = (props: ScaledDisplayProps) => {
  return props.cellDim;
};
