import styled from "styled-components";
import Posn from "../../logic/generic/posn";
import {
  BORDER_COLOR,
  PRIMARY_PLAYER_COLOR,
  SECONDARY_PLAYER_COLOR,
  TERTIARY_PLAYER_COLOR
} from "../../theme";
import {getCellDim, ScaledDisplayProps} from "../types";
import Maze from "../../logic/maze";

interface PlayerDisplayProps extends ScaledDisplayProps {
  readonly player: Posn;
  readonly maze: Maze;
}

const getTop = (props: PlayerDisplayProps): number => {
  return props.player.y * props.cellDim + getPlayerDim(props) / 8;
}

const getLeft = (props: PlayerDisplayProps): number => {
  return props.player.x * props.cellDim + getPlayerDim(props) / 8;
}

const getPlayerDim = (props: ScaledDisplayProps): number => {
  return props.cellDim * 0.8;
}

const getPlayerColor = (props: PlayerDisplayProps): string => {
  const playerNode = props.maze.posToNode.find(props.player);
  if (playerNode === 0 || playerNode === props.maze.nodes.length - 1) {
    return PRIMARY_PLAYER_COLOR;
  } else if (props.player.x % 2 === 0) {
    return SECONDARY_PLAYER_COLOR;
  } else {
    return TERTIARY_PLAYER_COLOR;
  }
}

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
