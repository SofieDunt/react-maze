import Node, {NodeType} from "../../logic/node";
import styled from "styled-components";
import {
  BORDER_COLOR,
  FINISH_COLOR,
  FOUND_COLOR,
  PATH_COLOR,
  STANDARD_COLOR,
  START_COLOR
} from "../../theme";
import {ScaledDisplayProps, getCellDim} from "../types";
import Maze from "../../logic/maze";
import {hasPathToBottom, hasPathToRight} from "../../logic/navigate";

interface NodeDisplayProps extends ScaledDisplayProps {
  readonly node: Node;
  readonly maze: Maze;
  readonly found: number[];
  readonly path: number[];
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

const getRightBorderColorFound = (props: NodeDisplayProps) => {
  return getRightBorderColor(props, () => { return FOUND_COLOR });
}

const getRightBorderColorPath = (props: NodeDisplayProps) => {
  return getRightBorderColor(props, () => { return PATH_COLOR });
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

const getBottomBorderColorFound = (props: NodeDisplayProps) => {
  return getBottomBorderColor(props, () => { return FOUND_COLOR });
}

const getBottomBorderColorPath = (props: NodeDisplayProps) => {
  return getBottomBorderColor(props, () => { return PATH_COLOR });
}

const getDelay = (props: NodeDisplayProps) => {
  return props.delay;
}

const getFoundDelay = (props: NodeDisplayProps) => {
  if (props.found.includes(props.node.id)) {
    return props.found.findIndex((value => { return value === props.node.id })) * props.delay;
  } else {
    return 0;
  }
}

const getPathDelay = (props: NodeDisplayProps) => {
  if (props.path.includes(props.node.id)) {
    return (props.path.length * props.delay) -  (props.path.findIndex((value => { return value === props.node.id})) * props.delay);
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
  
  &.found {
    background: ${FOUND_COLOR};
    border-right: solid 3px ${getRightBorderColorFound};
    border-bottom: solid 3px ${getBottomBorderColorFound};
    transition: background ${getDelay}ms ${getFoundDelay}ms, border ${getDelay}ms ${getFoundDelay}ms;
  }
  
  &.path {
    background: ${PATH_COLOR};
    border-right: solid 3px ${getRightBorderColorPath};
    border-bottom: solid 3px ${getBottomBorderColorPath};
    transition: background ${getDelay}ms ${getPathDelay}ms, border ${getDelay}ms ${getPathDelay}ms;
  }
`;

export default NodeDisplay;
