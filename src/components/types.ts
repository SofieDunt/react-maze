import Maze from "../logic/maze";

export interface ScaledDisplayProps {
  readonly cellDim: number;
}

export interface MazeComponentDisplayProps extends ScaledDisplayProps {
  readonly maze: Maze;
}

export const getCellDim = (props: ScaledDisplayProps) => {
  return props.cellDim;
};
