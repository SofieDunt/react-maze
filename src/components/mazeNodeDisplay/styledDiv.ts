import { ScaledDisplayProps } from '../types';
import styled from 'styled-components';
import { getCellDim } from '../utils';

interface StyledDivProps extends ScaledDisplayProps {
  readonly backgroundColor: string;
  readonly rightBorderColor: string;
  readonly bottomBorderColor: string;
  readonly duration: number;
  readonly delay: number;
}

export const StyledDiv = styled.div`
  box-sizing: border-box;
  flex-grow: 1;
  width: ${getCellDim}px;
  height: ${getCellDim}px;
  background: ${(props: StyledDivProps) => props.backgroundColor};
  border-right: solid 3px ${(props: StyledDivProps) => props.rightBorderColor};
  border-bottom: solid 3px ${(props: StyledDivProps) => props.bottomBorderColor};
  transition: background ${(props: StyledDivProps) => props.duration}ms
      ${(props: StyledDivProps) => props.delay}ms,
    border ${(props: StyledDivProps) => props.duration}ms
      ${(props: StyledDivProps) => props.delay}ms;
`;
