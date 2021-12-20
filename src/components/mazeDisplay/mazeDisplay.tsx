import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Maze from "../../logic/maze";
import NodeDisplay from "../nodeDisplay";
import PlayerDisplay from "../playerDisplay";
import {ScaledDisplayProps} from "../types";
import {canMoveDown, canMoveLeft, canMoveRight, canMoveUp} from "../../logic/navigate";
import Posn, {posn} from "../../logic/generic/posn";
import {bfsFinish, dfsFinish, SearchResult} from "../../logic/search";
import {BORDER_COLOR} from "../../theme";

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
  display: flex;
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

const MazeDisplay: React.FC<MazeDisplayProps> = ({ maze}) => {
  const [cellDim, setCellDim] = useState(0);
  const [player, setPlayer] = useState(posn(0, 0));
  const [playerSolved, setPlayerSolved] = useState(false);
  const [playerFound, setPlayerFound] = useState(new Set<number>());
  const [searchResult, setSearchResult] = useState<SearchResult>({ found: [], path: [] });
  const [timeoutId, setTimeoutId] = useState<any>();
  const delay = 300;

  const resetSearch = () => {
    clearTimeout(timeoutId);
    setSearchResult({ found: [], path: [] });
  }

  useEffect(() => {
    setSearchResult({ found: [], path: [] });
    setPlayer(posn(0, 0));
    setPlayerFound(new Set<number>());
  }, [maze])

  const onPlayerFind = (found: Posn): void => {
    setPlayer(found);
    playerFound.add(maze.posToNode.find(found));
    onPlayerSolve(found);
  }

  const onPlayerSolve = (pos: Posn): void => {
    if (pos.x === maze.xDim - 1 && pos.y === maze.yDim - 1) {
      setPlayerSolved(true);
      const path = bfsFinish(maze).path;
      resetSearch();

      const playerFoundArray: number[] = [];
      playerFound.forEach((val) => playerFoundArray.push(val));
      setSearchResult({found: playerFoundArray, path: []});
      setTimeoutId(setTimeout(() => setSearchResult({
        found: playerFoundArray,
        path
      }), delay * playerFoundArray.length));
    }
  }

  const onFinishSearch = (result: SearchResult): void => {
    resetSearch();
    setTimeoutId(setTimeout(() => setSearchResult({ found: result.found, path: [] }), 1));
    setTimeoutId(setTimeout(() => setSearchResult(result), delay * result.found.length));
  }

  const onKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case ('ArrowRight'):
      case('d'):
        if (canMoveRight(player, maze)) {
          onPlayerFind(posn(player.x + 1, player.y));
        }
        break;
      case ('ArrowLeft'):
      case('a'):
        if (canMoveLeft(player, maze)) {
          onPlayerFind(posn(player.x - 1, player.y));
        }
        break;
      case ('ArrowUp'):
      case('w'):
        if (canMoveUp(player, maze)) {
          onPlayerFind(posn(player.x, player.y - 1));
        }
        break;
      case ('ArrowDown'):
      case('s'):
        if (canMoveDown(player, maze)) {
          onPlayerFind(posn(player.x, player.y + 1));
        }
        break;
      case ('b'):
        onFinishSearch(bfsFinish(maze));
        break;
      case ('f'):
        onFinishSearch(dfsFinish(maze));
        break;
      case ('r'):
        resetSearch();
        setPlayer(posn(0, 0));
        setPlayerSolved(false);
        setPlayerFound(new Set<number>());
        break;
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
            return <NodeDisplay key={id} className={(searchResult.found.includes(id) ? 'found' : '') + (searchResult.path.includes(id) ? ' path' : '')} node={node} maze={maze} found={searchResult.found} path={searchResult.path} cellDim={cellDim} delay={delay} />
          })}
          <PlayerDisplay cellDim={cellDim} player={player} maze={maze} />
        </MazeDisplayContainer>
      </>
  );
}

export default MazeDisplay;
