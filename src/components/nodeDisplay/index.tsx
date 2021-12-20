import Node from "../../logic/node";
import Edge from "../../logic/edge";
import styled from "styled-components";
import {BORDER_COLOR} from "../../theme";
import {ScaledDisplayProps, getCellDim} from "../types";

interface NodeDisplayProps extends ScaledDisplayProps {
  readonly node: Node;
  readonly edges: Edge[][];
  readonly xDim: number;
  readonly yDim: number;
}

const getColor = (props: NodeDisplayProps) => {
  return props.node.getColor();
}

const getRightBorderColor = (props: NodeDisplayProps) => {
  if (props.node.hasPathToRight(props.edges, props.xDim)) {
    return props.node.getColor();
  } else {
    return BORDER_COLOR;
  }
}

const getBottomBorderColor = (props: NodeDisplayProps) => {
  if (props.node.hasPathToBottom(props.edges, props.xDim, props.yDim)) {
    return props.node.getColor();
  } else {
    return BORDER_COLOR;
  }
}

const NodeDisplay = styled.div`
  box-sizing: border-box;
  flex-grow: 1;
  width: ${getCellDim}px;
  height: ${getCellDim}px;
  background: ${getColor};
  border-right: solid 3px ${getRightBorderColor};
  border-bottom: solid 3px ${getBottomBorderColor};
`;

export default NodeDisplay;
