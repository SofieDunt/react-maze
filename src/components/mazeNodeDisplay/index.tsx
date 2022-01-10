import React from "react";
import styled from "styled-components";
import { MazeNodeDto } from "../../api/dto";
import { getCellDim, ScaledDisplayProps } from "../types";
import {
  BORDER_COLOR,
  FINISH_COLOR,
  FOUND_COLOR,
  PATH_COLOR,
  STANDARD_COLOR,
  START_COLOR,
} from "../../theme";

export enum MazeNodeDisplayRenderState {
  STANDARD,
  PLAYER_FOUND,
  FOUND,
  PATH,
}

interface MazeNodeDisplayProps extends ScaledDisplayProps {
  readonly node: MazeNodeDto;
  readonly source: number;
  readonly target: number;
  readonly renderState: MazeNodeDisplayRenderState;
  readonly delay: number;
  readonly wait: number;
}

function getNodeColor(
  node: MazeNodeDto,
  source: number,
  target: number,
  renderState: MazeNodeDisplayRenderState
): string {
  switch (renderState) {
    case MazeNodeDisplayRenderState.PATH:
      return PATH_COLOR;
    case MazeNodeDisplayRenderState.FOUND:
      return FOUND_COLOR;
    case MazeNodeDisplayRenderState.PLAYER_FOUND:
      return START_COLOR;
    case MazeNodeDisplayRenderState.STANDARD:
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
  renderState: MazeNodeDisplayRenderState
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
  renderState: MazeNodeDisplayRenderState
) {
  if (node.hasPathToBottom) {
    return getNodeColor(node, source, target, renderState);
  } else {
    return BORDER_COLOR;
  }
}

interface StyleProps extends ScaledDisplayProps {
  readonly backgroundColor: string;
  readonly rightBorderColor: string;
  readonly bottomBorderColor: string;
  readonly delay: number;
  readonly wait: number;
}

const StyledDiv = styled.div`
  box-sizing: border-box;
  flex-grow: 1;
  width: ${getCellDim}px;
  height: ${getCellDim}px;
  background: ${(props: StyleProps) => props.backgroundColor};
  border-right: solid 3px ${(props: StyleProps) => props.rightBorderColor};
  border-bottom: solid 3px ${(props: StyleProps) => props.bottomBorderColor};
  transition: background ${(props: StyleProps) => props.delay}ms
      ${(props: StyleProps) => props.wait}ms,
    border ${(props: StyleProps) => props.delay}ms
      ${(props: StyleProps) => props.wait}ms;
`;

const MazeNodeDisplay: React.FC<MazeNodeDisplayProps> = ({
  node,
  source,
  target,
  renderState,
  delay,
  wait,
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
        renderState
      )}
      delay={delay}
      wait={wait}
      cellDim={cellDim}
    />
  );
};

export default MazeNodeDisplay;
