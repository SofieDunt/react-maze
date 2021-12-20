export interface ScaledDisplayProps {
  readonly cellDim: number;
}

export const getCellDim = (props: ScaledDisplayProps) => {
  return props.cellDim;
}
