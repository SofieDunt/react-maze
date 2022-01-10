import styled from 'styled-components';
import {
  BORDER_COLOR,
  PRIMARY_PLAYER_COLOR,
  SECONDARY_PLAYER_COLOR,
  TERTIARY_PLAYER_COLOR,
} from '../../theme';
import { getCellDim, ScaledDisplayProps } from '../types';
import { MazeDto } from '../../api/dto';

interface PlayerDisplayProps extends ScaledDisplayProps {
  readonly player: number;
  readonly maze: MazeDto;
  readonly source: number;
  readonly target: number;
}

const getTop = (props: PlayerDisplayProps): number => {
  return props.maze.nodes[props.player].posn.y * props.cellDim + getPlayerDim(props) / 8;
};

const getLeft = (props: PlayerDisplayProps): number => {
  return props.maze.nodes[props.player].posn.x * props.cellDim + getPlayerDim(props) / 8;
};

const getPlayerDim = (props: ScaledDisplayProps): number => {
  return props.cellDim * 0.8;
};

const getPlayerColor = (props: PlayerDisplayProps): string => {
  if (
    props.player === props.source||
    props.player === props.target
  ) {
    return PRIMARY_PLAYER_COLOR;
  } else if (props.maze.nodes[props.player].posn.x % 2 === 0) {
    return SECONDARY_PLAYER_COLOR;
  } else {
    return TERTIARY_PLAYER_COLOR;
  }
};

const PlayerDisplay = styled.div`
  position: absolute;
  top: ${getTop}px;
  left: ${getLeft}px;
  background: ${getPlayerColor};
  border: 1px solid ${BORDER_COLOR};
  border-radius: ${getCellDim}px;
  width: ${getPlayerDim}px;
  height: ${getPlayerDim}px;
  transition: all 0.15s ease-in-out, background 0.5s ease-in-out;
`;

export default PlayerDisplay;
