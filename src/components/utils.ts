import { MazeNodeDisplayState, ScaledDisplayProps } from './types';
import { IdMap } from '../api/dto';

export const getCellDim = (props: ScaledDisplayProps) => {
  return props.cellDim;
};

export const getMazeNodeState = (
  id: number,
  found: IdMap,
  path: IdMap,
  playerFound: IdMap,
) => {
  let renderState = MazeNodeDisplayState.STANDARD;
  if (path.has(id)) {
    renderState = MazeNodeDisplayState.PATH;
  } else if (found.has(id)) {
    renderState = MazeNodeDisplayState.FOUND;
  } else if (playerFound.has(id)) {
    renderState = MazeNodeDisplayState.PLAYER_FOUND;
  }
  return renderState;
};

export const getNodeTransitionDelay = (
  id: number,
  renderState: MazeNodeDisplayState,
  found: IdMap,
  path: IdMap,
  duration: number,
) => {
  let order;
  switch (renderState) {
    case MazeNodeDisplayState.PATH:
      order = path.get(id);
      if (order !== undefined) {
        return (order * duration) / 2;
      }
      break;
    case MazeNodeDisplayState.FOUND:
      order = found.get(id);
      if (order !== undefined) {
        return order * duration;
      }
      break;
    default:
      return 0;
  }
  return 0;
};
