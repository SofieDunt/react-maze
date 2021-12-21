import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Maze from "../../logic/maze";
import NodeDisplay from "../nodeDisplay";
import PlayerDisplay from "../playerDisplay";
import { MazeComponentDisplayProps, ScaledDisplayProps } from "../types";
import Posn from "../../logic/generic/posn";
import {
  reconstructPath,
  searchNode,
  SearchResult,
  SearchType,
} from "../../logic/search";
import { BORDER_COLOR } from "../../theme";
import Worklist from "../../logic/generic/worklist";
import { IdMap } from "../../logic/utils";

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
  readonly maze: Maze;
  readonly worklist: Worklist<number>;
  readonly currentSearch: SearchType;
  readonly searchParents: IdMap;
  readonly searchResult: SearchResult;
  readonly setSearchResult: (callback: (prev: any) => SearchResult) => void;
  readonly player: Posn;
  readonly playerFound: IdMap;
  readonly target: number;
  readonly setTimeoutId: (id: any) => void;
}

const SearchableMaze: React.FC<SearchableMazeProps> = ({
  maze,
  worklist,
  currentSearch,
  searchParents,
  searchResult,
  setSearchResult,
  player,
  playerFound,
  target,
  setTimeoutId,
  cellDim,
}) => {
  const [searchLevel, setSearchLevel] = useState(0);
  const delay = 150;

  useEffect(() => {
    if (!worklist.isEmpty() && currentSearch !== SearchType.NONE) {
      searchNode(worklist, maze, target, searchResult.found, searchParents);
      setSearchLevel((prev) => prev + 1);
      if (worklist.isEmpty()) {
        const path = reconstructPath(searchParents, maze, target);
        setTimeoutId(
          setTimeout(
            () =>
              setSearchResult((prev) => {
                return { found: prev.found, path };
              }),
            searchResult.found.size * delay
          )
        );
      }
    }
  }, [
    worklist,
    currentSearch,
    searchResult,
    maze,
    target,
    searchParents,
    searchLevel,
    setTimeoutId,
    setSearchResult,
  ]);

  useEffect(() => {
    setSearchResult(() => {
      return {
        found: new Map<number, number>(),
        path: new Map<number, number>(),
      };
    });
  }, [maze, setSearchResult]);

  return (
    <MazeDisplayContainer maze={maze} cellDim={cellDim}>
      {maze.nodes.map((node, id) => {
        return (
          <NodeDisplay
            key={id}
            className={
              (searchResult.found.has(id) ? "found" : "") +
              (searchResult.path.has(id) ? " path" : "") +
              (playerFound.has(id) ? " player-found" : "")
            }
            node={node}
            maze={maze}
            found={searchResult.found}
            path={searchResult.path}
            cellDim={cellDim}
            delay={delay}
          />
        );
      })}
      <PlayerDisplay cellDim={cellDim} player={player} maze={maze} />
    </MazeDisplayContainer>
  );
};

export default SearchableMaze;
