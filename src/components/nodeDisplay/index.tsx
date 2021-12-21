import Node, {NodeType} from "../../logic/node";
import styled from "styled-components";
import {
  BORDER_COLOR,
  FINISH_COLOR,
  FOUND_COLOR,
  PATH_COLOR,
  STANDARD_COLOR,
  START_COLOR,
} from "../../theme";
import {ScaledDisplayProps, getCellDim} from "../types";
import Maze from "../../logic/maze";
import {hasPathToBottom, hasPathToRight} from "../../logic/navigate";
import {IdMap} from "../../logic/utils";

interface NodeDisplayProps extends ScaledDisplayProps {
  readonly node: Node;
  readonly maze: Maze;
  readonly found: IdMap;
  readonly path: IdMap;
  readonly delay: number;
}

export function getNodeColor(props: NodeDisplayProps): string {
  switch (props.node.type) {
    case NodeType.START:
      return START_COLOR;
    case NodeType.FINISH:
      return FINISH_COLOR;
    case NodeType.FOUND:
      return 'blue';
    case NodeType.UNDISCOVERED:
    default:
      return STANDARD_COLOR;
  }
}

const getRightBorderColor = (props: NodeDisplayProps, connectedColor: () => string) => {
  if (hasPathToRight(props.node, props.maze)) {
    return connectedColor();
  } else {
    return BORDER_COLOR;
  }
}

const getRightBorderColorStandard = (props: NodeDisplayProps) => {
  return getRightBorderColor(props, () => getNodeColor(props));
}

const getRightBorderColorUnique = (props: NodeDisplayProps, color: string) => {
  return getRightBorderColor(props, () => { return color });
}

const getBottomBorderColor = (props: NodeDisplayProps, connectedColor: () => string) => {
  if (hasPathToBottom(props.node, props.maze)) {
    return connectedColor();
  } else {
    return BORDER_COLOR;
  }
}

const getBottomBorderColorStandard = (props: NodeDisplayProps) => {
  return getBottomBorderColor(props, () => getNodeColor(props));
}

const getBottomBorderColorUnique = (props: NodeDisplayProps, color: string) => {
  return getBottomBorderColor(props, () => { return color });
}

const getDelay = (props: NodeDisplayProps) => {
  return props.delay;
}

const getFoundDelay = (props: NodeDisplayProps) => {
  const order = props.found.get(props.node.id);
  if (order !== undefined) {
    return order * props.delay;
  } else {
    return 0;
  }
}

const getPathDelay = (props: NodeDisplayProps) => {
  const order = props.path.get(props.node.id);
  if (order !== undefined) {
    return order * props.delay / 2;
  } else {
    return 0;
  }
}

const NodeDisplay = styled.div`
  box-sizing: border-box;
  flex-grow: 1;
  width: ${getCellDim}px;
  height: ${getCellDim}px;
  background: ${getNodeColor};
  border-right: solid 3px ${getRightBorderColorStandard};
  border-bottom: solid 3px ${getBottomBorderColorStandard};
   
  &.player-found {
    background: ${START_COLOR};
    border-right: solid 3px ${(props) => getRightBorderColorUnique(props, START_COLOR)};
    border-bottom: solid 3px ${(props) => getBottomBorderColorUnique(props, START_COLOR)};
  }
  
  &.found {
    background: ${FOUND_COLOR};
    border-right: solid 3px ${(props) => getRightBorderColorUnique(props, FOUND_COLOR)};
    border-bottom: solid 3px ${(props) => getBottomBorderColorUnique(props, FOUND_COLOR)};
    transition: background ${getDelay}ms ${getFoundDelay}ms, border ${getDelay}ms ${getFoundDelay}ms;
  }
  
  &.path {
    background: ${PATH_COLOR};
    border-right: solid 3px ${(props) => getRightBorderColorUnique(props, PATH_COLOR)};
    border-bottom: solid 3px ${(props) => getBottomBorderColorUnique(props, PATH_COLOR)};
    transition: background ${getDelay}ms ${getPathDelay}ms, border ${getDelay}ms ${getPathDelay}ms;
  }
`;

export default NodeDisplay;
