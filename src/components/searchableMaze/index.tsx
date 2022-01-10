import React from "react";
import styled from "styled-components";
import PlayerDisplay from "../playerDisplay";
import { MazeComponentDisplayProps, ScaledDisplayProps } from "../types";
import { BORDER_COLOR } from "../../theme";
import { IdMap, MappedSearchDto, MazeDto, PlayerDto } from "../../api/dto";
import MazeNodeDisplay, {
  MazeNodeDisplayRenderState,
} from "../mazeNodeDisplay";

const getMazeXDim = (props: MazeComponentDisplayProps) => {
  return props.maze.xDim * props.cellDim;
};

const getMazeYDim = (props: MazeComponentDisplayProps) => {
  return props.maze.yDim * props.cellDim;
};

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

interface SearchableMazeProps extends ScaledDisplayProps {
  readonly maze: MazeDto;
  readonly source: number;
  readonly target: number;
  readonly searchResult: MappedSearchDto;
  readonly player: PlayerDto;
  readonly playerFound: IdMap;
  readonly delay: number;
}

const SearchableMaze: React.FC<SearchableMazeProps> = ({
  maze,
  source,
  target,
  searchResult,
  player,
  playerFound,
  delay,
  cellDim,
}) => {
  return (
    <MazeDisplayContainer maze={maze} cellDim={cellDim}>
      {maze.nodes.map((node, id) => {
        let renderState = MazeNodeDisplayRenderState.STANDARD;
        if (searchResult.path.has(id)) {
          renderState = MazeNodeDisplayRenderState.PATH;
        } else if (searchResult.found.has(id)) {
          renderState = MazeNodeDisplayRenderState.FOUND;
        } else if (playerFound.has(id)) {
          renderState = MazeNodeDisplayRenderState.PLAYER_FOUND;
        }

        let wait = 0;
        if (renderState === MazeNodeDisplayRenderState.PATH) {
          const order = searchResult.path.get(node.id);
          if (order !== undefined) {
            wait = (order * delay) / 2;
          }
        } else if (renderState === MazeNodeDisplayRenderState.FOUND) {
          const order = searchResult.found.get(node.id);
          if (order !== undefined) {
            wait = order * delay;
          }
        }

        return (
          <MazeNodeDisplay
            key={id}
            node={node}
            source={source}
            target={target}
            renderState={renderState}
            delay={delay}
            wait={wait}
            cellDim={cellDim}
          />
        );
      })}
      <PlayerDisplay cellDim={cellDim} player={player} maze={maze} />
    </MazeDisplayContainer>
  );
};

export default SearchableMaze;
