import { ScaledDisplayProps } from '../types';
import styled from 'styled-components';
import { getCellDim } from '../utils';
import { BORDER_COLOR } from '../../theme';

interface StyledDivProps extends ScaledDisplayProps {
  readonly backgroundColor: string;
  readonly rightBorderColor: string;
  readonly bottomBorderColor: string;
  readonly duration: number;
  readonly delay: number;
}

function borderWidth(borderColor: string): string {
  return borderColor !== BORDER_COLOR ? '0' : '5px';
}

export const StyledDiv = styled.div`
  box-sizing: border-box;
  flex-grow: 1;
  width: ${getCellDim}px;
  height: ${getCellDim}px;
  background: ${(props: StyledDivProps) => props.backgroundColor};
  border-right: solid
    ${(props: StyledDivProps) => borderWidth(props.rightBorderColor)}
    ${(props: StyledDivProps) => props.rightBorderColor};
  border-bottom: solid
    ${(props: StyledDivProps) => borderWidth(props.bottomBorderColor)}
    ${(props: StyledDivProps) => props.bottomBorderColor};
  transition: background ${(props: StyledDivProps) => props.duration}ms
      ${(props: StyledDivProps) => props.delay}ms,
    border ${(props: StyledDivProps) => props.duration}ms
      ${(props: StyledDivProps) => props.delay}ms;
`;
