import Node, {NodeType} from "../../logic/node";
import styled from "styled-components";
import {BORDER_COLOR, FINISH_COLOR, STANDARD_COLOR, START_COLOR} from "../../theme";
import {ScaledDisplayProps, getCellDim} from "../types";
import Maze from "../../logic/maze";
import {hasPathToBottom, hasPathToRight} from "../../logic/navigate";

interface NodeDisplayProps extends ScaledDisplayProps {
  readonly node: Node;
  readonly maze: Maze;
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

const getRightBorderColor = (props: NodeDisplayProps) => {
  if (hasPathToRight(props.node, props.maze)) {
    return getNodeColor(props);
  } else {
    return BORDER_COLOR;
  }
}

const getBottomBorderColor = (props: NodeDisplayProps) => {
  if (hasPathToBottom(props.node, props.maze)) {
    return getNodeColor(props);
  } else {
    return BORDER_COLOR;
  }
}

const NodeDisplay = styled.div`
  box-sizing: border-box;
  flex-grow: 1;
  width: ${getCellDim}px;
  height: ${getCellDim}px;
  background: ${getNodeColor};
  border-right: solid 3px ${getRightBorderColor};
  border-bottom: solid 3px ${getBottomBorderColor};
`;

export default NodeDisplay;
