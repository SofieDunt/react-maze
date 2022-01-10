import React from 'react';
import { MazeNodeDto } from '../../api/dto';
import { MazeNodeDisplayState, ScaledDisplayProps } from '../types';
import {
  BORDER_COLOR,
  FINISH_COLOR,
  FOUND_COLOR,
  PATH_COLOR,
  STANDARD_COLOR,
  START_COLOR,
} from '../../theme';
import { StyledDiv } from './styledDiv';

interface MazeNodeDisplayProps extends ScaledDisplayProps {
  readonly node: MazeNodeDto;
  readonly source: number;
  readonly target: number;
  readonly renderState: MazeNodeDisplayState;
  readonly duration: number;
  readonly delay: number;
}

function getNodeColor(
  node: MazeNodeDto,
  source: number,
  target: number,
  renderState: MazeNodeDisplayState,
): string {
  switch (renderState) {
    case MazeNodeDisplayState.PATH:
      return PATH_COLOR;
    case MazeNodeDisplayState.FOUND:
      return FOUND_COLOR;
    case MazeNodeDisplayState.PLAYER_FOUND:
      return START_COLOR;
    case MazeNodeDisplayState.STANDARD:
      if (node.id === source) {
        return START_COLOR;
      } else if (node.id === target) {
        return FINISH_COLOR;
      } else {
        return STANDARD_COLOR;
      }
    default:
      return STANDARD_COLOR;
  }
}

function getRightBorderColor(
  node: MazeNodeDto,
  source: number,
  target: number,
  renderState: MazeNodeDisplayState,
) {
  if (node.hasPathToRight) {
    return getNodeColor(node, source, target, renderState);
  } else {
    return BORDER_COLOR;
  }
}

function getBottomBorderColor(
  node: MazeNodeDto,
  source: number,
  target: number,
  renderState: MazeNodeDisplayState,
) {
  if (node.hasPathToBottom) {
    return getNodeColor(node, source, target, renderState);
  } else {
    return BORDER_COLOR;
  }
}

const MazeNodeDisplay: React.FC<MazeNodeDisplayProps> = ({
  node,
  source,
  target,
  renderState,
  duration,
  delay,
  cellDim,
}) => {
  return (
    <StyledDiv
      backgroundColor={getNodeColor(node, source, target, renderState)}
      rightBorderColor={getRightBorderColor(node, source, target, renderState)}
      bottomBorderColor={getBottomBorderColor(
        node,
        source,
        target,
        renderState,
      )}
      duration={duration}
      delay={delay}
      cellDim={cellDim}
    />
  );
};

export default MazeNodeDisplay;
