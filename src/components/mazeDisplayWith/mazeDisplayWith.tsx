import React, {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import Maze from "../../logic/maze";
import NodeDisplay from "../nodeDisplay";
import PlayerDisplay from "../playerDisplay";
import {ScaledDisplayProps} from "../types";
import {move} from "../../logic/navigate";
import Posn, {posn} from "../../logic/generic/posn";
import {reconstructPath, searchNode, SearchResult, SearchType} from "../../logic/search";
import {BORDER_COLOR} from "../../theme";
import Worklist from "../../logic/generic/worklist";
import LifoList from "../../logic/generic/lifoList";
import BfsList from "../../logic/generic/bfsList";
import {MOVE_KEYS, RESET_KEYS, SEARCH_KEYS} from "../../keys";

type MazeDisplayContainerProps = ScaledDisplayProps & MazeDisplayProps;

const getMazeDisplayXDim = (props: MazeDisplayContainerProps) => {
  return props.maze.xDim * props.cellDim;
}

const getMazeDisplayYDim = (props: MazeDisplayContainerProps) => {
  return props.maze.yDim * props.cellDim;
}

const MazeDisplayContainer = styled.div`
  position: relative;
  min-width: ${getMazeDisplayXDim}px;
  width: ${getMazeDisplayXDim}px;
  height: ${getMazeDisplayYDim}px;
  display: inline-flex;
  flex-wrap: wrap;
  align-content: stretch;
  border: 5px solid ${BORDER_COLOR};
`;

const SolvedBanner = styled.div`
  height: 45px;
  min-width: 100%;
  line-height: 45px;
  font-size: 19px;
`;

interface MazeDisplayProps {
  readonly maze: Maze;
}

const MazeDisplayWith: React.FC<MazeDisplayProps> = ({ maze}) => {
  const [cellDim, setCellDim] = useState(0);
  const [player, setPlayer] = useState(posn(0, 0));
  const [playerSolved, setPlayerSolved] = useState(false);
  const [playerFound, setPlayerFound] = useState(new Map<number, number>());
  const [playerParents, setPlayerParents] = useState(new Map<number, number>());
  const [timeoutId, setTimeoutId] = useState<any>();

  const [currentSearch, setCurrentSearch] = useState(SearchType.NONE);
  const [worklist, setWorklist] = useState<Worklist<number>>(new LifoList<number>());
  const [searchLevel, setSearchLevel] = useState(0);
  const [searchResult, setSearchResult] = useState<SearchResult>({ found: new Map<number, number>(), path: new Map<number, number>() });
  const searchParents = useMemo(() => new Map<number, number>(), []);

  const delay = 150;
  const target = useMemo(() => maze.posToNode.find(posn(maze.xDim - 1, maze.yDim - 1)), [maze]);

  useEffect(() => {
    if (!worklist.isEmpty() && currentSearch !== SearchType.NONE) {
        searchNode(worklist, maze, target, searchResult.found, searchParents);
        setSearchLevel((prev) => prev + 1);
        if (worklist.isEmpty()) {
          const path = reconstructPath(searchParents, maze, target);
          setTimeoutId(setTimeout(() => setSearchResult((prev) => { return { found: prev.found, path } }), searchResult.found.size * delay));
        }
    }
  }, [worklist, currentSearch, searchResult, maze, target, searchParents, searchLevel])

  useEffect(() => {
    searchParents.clear();
    setSearchResult({ found: new Map<number, number>(), path: new Map<number, number>() });
    let n;
    switch (currentSearch) {
      case SearchType.NONE:
        setWorklist(new LifoList<number>());
        break;
      case SearchType.BFS:
        n = new BfsList<number>();
        setWorklist(n);
        n.add(0);
        break;
      case SearchType.DFS:
        n = new LifoList<number>();
        setWorklist(n);
        n.add(0);
        break;
    }
  }, [currentSearch, searchParents])

  const resetSearch = () => {
    setCurrentSearch(SearchType.NONE);
  }

  const resetPlayer = () => {
    setPlayer(posn(0, 0));
    setPlayerSolved(false);
    setPlayerFound(new Map<number, number>());
    setPlayerParents(new Map<number, number>());
  }

  useEffect(() => {
    setSearchResult({ found: new Map<number, number>(), path: new Map<number, number>() });
    resetPlayer();
  }, [maze])

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
      resetSearch();
      resetPlayer();
    }
  }

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
          <MazeDisplayContainer maze={maze} cellDim={cellDim}>
            {maze.nodes.map((node, id) => {
              return <NodeDisplay key={id}
                                  className={
                                      (searchResult.found.has(id) ? 'found' : '') +
                                      (searchResult.path.has(id) ? ' path' : '') +
                                      (playerFound.has(id) ? ' player-found' : '')
                                  }
                                  node={node}
                                  maze={maze}
                                  found={searchResult.found}
                                  path={searchResult.path}
                                  cellDim={cellDim}
                                  delay={delay} />
            })}
            <PlayerDisplay cellDim={cellDim} player={player} maze={maze} />
          </MazeDisplayContainer>
        </>
    );
}

export default MazeDisplayWith;
