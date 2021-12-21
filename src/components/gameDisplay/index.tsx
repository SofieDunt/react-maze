import React, {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import Maze from "../../logic/maze";
import PlayerDisplay from "../playerDisplay";
import {move} from "../../logic/navigate";
import Posn, {posn} from "../../logic/generic/posn";
import {reconstructPath, SearchResult, SearchType, searchWorklist} from "../../logic/search";
import Worklist from "../../logic/generic/worklist";
import LifoList from "../../logic/generic/lifoList";
import {MOVE_KEYS, RESET_KEYS, SEARCH_KEYS} from "../../keys";
import SearchableMaze from "../searchableMaze";

const SolvedBanner = styled.div`
  height: 45px;
  min-width: 100%;
  line-height: 45px;
  font-size: 19px;
`;

interface MazeDisplayProps {
  readonly maze: Maze;
}

const MazeGame: React.FC<MazeDisplayProps> = ({ maze}) => {
  const [cellDim, setCellDim] = useState(0);
  const [player, setPlayer] = useState(posn(0, 0));
  const [playerSolved, setPlayerSolved] = useState(false);
  const [playerFound, setPlayerFound] = useState(new Map<number, number>([]));
  const [playerParents, setPlayerParents] = useState(new Map<number, number>());
  const [timeoutId, setTimeoutId] = useState<any>();

  const [currentSearch, setCurrentSearch] = useState(SearchType.NONE);
  const [worklist, setWorklist] = useState<Worklist<number>>(new LifoList<number>());
  const [searchResult, setSearchResult] = useState<SearchResult>({ found: new Map<number, number>(), path: new Map<number, number>() });
  const searchParents = useMemo(() => new Map<number, number>(), []);

  const delay = 150;
  const target = useMemo(() => maze.posToNode.find(posn(maze.xDim - 1, maze.yDim - 1)), [maze]);

  const resetSearch = () => {
    setCurrentSearch(SearchType.NONE);
  }

  const resetPlayerStates = () => {
    setPlayer(posn(0, 0));
    setPlayerSolved(false);
    setPlayerFound(new Map<number, number>());
    setPlayerParents(new Map<number, number>());
  }

  const onPlayerFind = (found: Posn): void => {
    const nodeFound = maze.posToNode.find(found);
    if (!playerFound.has(nodeFound)) {
      playerFound.set(nodeFound, playerFound.size + 1);
      playerParents.set(nodeFound, maze.posToNode.find(player));
      setPlayer(found);
      onPlayerSolve(found);
    } else {
      setPlayer(found);
    }
  }

  const onPlayerSolve = (pos: Posn): void => {
    if (pos.x === maze.xDim - 1 && pos.y === maze.yDim - 1) {
      setPlayerSolved(true);
      resetSearch();

      setSearchResult({ found: playerFound, path: new Map<number, number>() });
      const path = reconstructPath(playerParents, maze, maze.posToNode.find(posn(maze.xDim - 1, maze.yDim - 1)));
      setTimeoutId(setTimeout(
          () => setSearchResult(
              (prev) => { return { found: prev.found, path } }),
          playerFound.size * delay));
    }
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (MOVE_KEYS[e.key] !== undefined) {
      onPlayerFind(move(player, maze, MOVE_KEYS[e.key]));
    } else if (SEARCH_KEYS[e.key] !== undefined) {
      clearTimeout(timeoutId);
      setCurrentSearch(SEARCH_KEYS[e.key]);
    } else if (RESET_KEYS.has(e.key)) {
      clearTimeout(timeoutId);
      resetPlayerStates();
      resetSearch();
    }
  }

  useEffect(() => {
    resetSearch();
    resetPlayerStates();
  }, [maze])

  useEffect(() => {
    searchParents.clear();
    setSearchResult({ found: new Map<number, number>(), path: new Map<number, number>() });
    setWorklist(searchWorklist(currentSearch, 0));
  }, [maze, currentSearch, searchParents])

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  })

  useEffect(() => {
    const calcCellDim = () => {
      const width = window.innerWidth - 50;
      const height = window.innerHeight - 250;
      setCellDim(Math.max(Math.min(width / maze.xDim, height / maze.yDim), 20));
    }

    calcCellDim();
    window.addEventListener('resize', calcCellDim);
    return () => window.removeEventListener('resize', calcCellDim);
  })

  return (
      <>
        <SolvedBanner>
          <p>{playerSolved && 'Maze solved!'}</p>
        </SolvedBanner>
        <SearchableMaze maze={maze} worklist={worklist} currentSearch={currentSearch} searchParents={searchParents} searchResult={searchResult} setSearchResult={setSearchResult} player={player} playerFound={playerFound} target={target} setTimeoutId={setTimeoutId} cellDim={cellDim} >
          <PlayerDisplay cellDim={cellDim} player={player} maze={maze} />
        </SearchableMaze>
      </>
  );
}

export default MazeGame;
