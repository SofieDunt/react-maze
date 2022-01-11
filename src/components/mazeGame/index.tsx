import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { MOVE_KEYS, RESET_KEYS, SEARCH_KEYS } from '../../keys';
import MazeDisplay from '../mazeDisplay';
import {
  GetPathDto,
  IdMap,
  MapMapper,
  MazeDto,
  SearchTypeEnum,
} from '../../api/dto';
import ApiClient, { PromiseRejectReason } from '../../api/apiClient';
import Navigator from './nav';
import { MappedSearchResult } from '../../App';

const mazeStart = 0;
const noneFound = (): MappedSearchResult => {
  return {
    found: new Map<number, number>(),
    path: new Map<number, number>(),
  };
};
const transitionDuration = 50;

const SolvedBanner = styled.div`
  height: 45px;
  min-width: 100%;
  line-height: 45px;
  font-size: 19px;
`;

interface MazeGameProps {
  readonly maze: MazeDto;
  readonly bfsSearch: MappedSearchResult;
  readonly dfsSearch: MappedSearchResult;
}

const MazeGame: React.FC<MazeGameProps> = ({ maze, bfsSearch, dfsSearch }) => {
  const [cellDim, setCellDim] = useState(0);

  const [player, setPlayer] = useState<number>(mazeStart);
  const [playerSolved, setPlayerSolved] = useState(false);
  const [playerFound, setPlayerFound] = useState(noneFound().found);
  const [playerParents, setPlayerParents] = useState(new Map<number, number>());

  const [timeoutId, setTimeoutId] = useState<any>();
  const [searchResult, setSearchResult] = useState<MappedSearchResult>(
    noneFound(),
  );

  const target = useMemo(() => maze.xDim * maze.yDim - 1, [maze]);

  const resetPlayerStates = () => {
    setPlayer(mazeStart);
    setPlayerSolved(false);
    setPlayerFound(noneFound().found);
    setPlayerParents(new Map<number, number>());
  };

  const updateSearchWithDelay = (found: IdMap, path: IdMap) => {
    clearTimeout(timeoutId);
    setSearchResult({ found, path: noneFound().path });
    setTimeoutId(
      setTimeout(
        () =>
          setSearchResult((prev) => {
            return { found: prev.found, path };
          }),
        found.size * transitionDuration,
      ),
    );
  };

  const onPlayerFind = (found: number): void => {
    if (!playerFound.has(found)) {
      // + 2 because will add start node as 1st found
      playerFound.set(found, playerFound.size + 2);
      playerParents.set(found, player);
      setPlayer(found);
      onPlayerSolve(found);
    } else {
      setPlayer(found);
    }
  };

  const onPlayerSolve = (player: number): void => {
    if (player === target) {
      setPlayerSolved(true);
      playerFound.set(0, 1); // found start node first
      ApiClient.getPath(
        new GetPathDto(MapMapper.mapIdMap(playerParents), mazeStart, player),
      )
        .then((unmappedPath) => {
          updateSearchWithDelay(
            playerFound,
            MapMapper.mapKeyVals(unmappedPath),
          );
        })
        .catch((reason: PromiseRejectReason) => {
          window.alert(reason.message);
        });
    }
  };

  function onKeyDown(e: KeyboardEvent): void {
    if (MOVE_KEYS[e.key] !== undefined) {
      const newPlayer = Navigator.move(player, maze, MOVE_KEYS[e.key]);
      onPlayerFind(newPlayer);
    } else if (SEARCH_KEYS[e.key] !== undefined) {
      setSearchResult(noneFound());
      let requestedSearchResult = noneFound();
      switch (SEARCH_KEYS[e.key]) {
        case SearchTypeEnum.BFS:
          requestedSearchResult = bfsSearch;
          break;
        case SearchTypeEnum.DFS:
          requestedSearchResult = dfsSearch;
          break;
      }
      setTimeout(
        () =>
          updateSearchWithDelay(
            requestedSearchResult.found,
            requestedSearchResult.path,
          ),
        transitionDuration,
      );
    } else if (RESET_KEYS.has(e.key)) {
      clearTimeout(timeoutId);
      setSearchResult(noneFound());
      resetPlayerStates();
    }
  }

  useEffect(() => {
    setSearchResult(noneFound());
    resetPlayerStates();
  }, [maze]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  useEffect(() => {
    const calcCellDim = () => {
      const width = window.innerWidth - 50;
      const height = window.innerHeight - 250;
      setCellDim(Math.max(Math.min(width / maze.xDim, height / maze.yDim), 20));
    };

    calcCellDim();
    window.addEventListener('resize', calcCellDim);
    return () => window.removeEventListener('resize', calcCellDim);
  });

  return (
    <>
      <SolvedBanner>
        <p>
          {playerSolved
            ? 'Maze solved!'
            : 'Find your way to the node at the bottom right!'}
        </p>
      </SolvedBanner>
      <MazeDisplay
        maze={maze}
        source={mazeStart}
        target={target}
        found={searchResult.found}
        path={searchResult.path}
        player={player}
        playerFound={playerFound}
        cellDim={cellDim}
        duration={transitionDuration}
      />
    </>
  );
};

export default MazeGame;
