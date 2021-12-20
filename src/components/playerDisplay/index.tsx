import styled from "styled-components";
import Posn from "../../logic/generic/posn";
import {PLAYER_COLOR, STANDARD_COLOR} from "../../theme";
import {getCellDim, ScaledDisplayProps} from "../types";

interface PlayerDisplayProps extends ScaledDisplayProps {
  readonly player: Posn;
}

const getTop = (props: PlayerDisplayProps) => {
  return props.player.y * props.cellDim + getPlayerDim(props) / 8;
}

const getLeft = (props: PlayerDisplayProps) => {
  return props.player.x * props.cellDim + getPlayerDim(props) / 8;
}

const getPlayerDim = (props: ScaledDisplayProps) => {
  return props.cellDim * 0.8;
}

const PlayerDisplay = styled.div`
  position: absolute;
  top: ${getTop}px;
  left: ${getLeft}px;
  background: ${PLAYER_COLOR};
  border: 1px solid ${STANDARD_COLOR};
  border-radius: ${getCellDim}px;
  width: ${getPlayerDim}px;
  height: ${getPlayerDim}px;
`;

export default PlayerDisplay;
