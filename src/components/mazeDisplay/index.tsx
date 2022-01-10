import React from 'react';
import styled from 'styled-components';
import PlayerDisplay from '../playerDisplay';
import { MazeComponentDisplayProps, ScaledDisplayProps } from '../types';
import { BORDER_COLOR } from '../../theme';
import { IdMap, MazeDto } from '../../api/dto';
import MazeNodeDisplay from '../mazeNodeDisplay';
import { getMazeNodeState, getNodeTransitionDelay } from '../utils';

function getMazeXDim(props: MazeComponentDisplayProps) {
  return props.maze.xDim * props.cellDim;
}

function getMazeYDim(props: MazeComponentDisplayProps) {
  return props.maze.yDim * props.cellDim;
}

const MazeDisplayContainer = styled.div`
  position: relative;
  min-width: ${getMazeXDim}px;
  width: ${getMazeXDim}px;
  height: ${getMazeYDim}px;
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
  border: 5px solid ${BORDER_COLOR};
`;

interface MazeDisplayProps extends ScaledDisplayProps {
  readonly maze: MazeDto;
  readonly source: number;
  readonly target: number;
  readonly found: IdMap;
  readonly path: IdMap;
  readonly player: number;
  readonly playerFound: IdMap;
  readonly duration: number;
}

const MazeDisplay: React.FC<MazeDisplayProps> = ({
  maze,
  source,
  target,
  found,
  path,
  player,
  playerFound,
  duration,
  cellDim,
}) => {
  return (
    <MazeDisplayContainer maze={maze} cellDim={cellDim}>
      {maze.nodes.map((node, id) => {
        const renderState = getMazeNodeState(id, found, path, playerFound);
        const delay = getNodeTransitionDelay(
          id,
          renderState,
          found,
          path,
          duration,
        );

        return (
          <MazeNodeDisplay
            key={id}
            node={node}
            source={source}
            target={target}
            renderState={renderState}
            duration={duration}
            delay={delay}
            cellDim={cellDim}
          />
        );
      })}
      <PlayerDisplay
        cellDim={cellDim}
        player={player}
        maze={maze}
        source={source}
        target={target}
      />
    </MazeDisplayContainer>
  );
};

export default MazeDisplay;
