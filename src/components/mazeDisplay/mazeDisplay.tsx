import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Maze from "../../logic/maze";
import NodeDisplay from "../nodeDisplay";
import PlayerDisplay from "../playerDisplay";
import {ScaledDisplayProps} from "../types";
import {canMoveDown, canMoveLeft, canMoveRight, canMoveUp} from "../../logic/navigate";
import {posn} from "../../logic/generic/posn";
import {bfsFinish, dfsFinish, SearchResult} from "../../logic/search";

interface MazeDisplayContainerProps extends ScaledDisplayProps, MazeDisplayProps{
}

const getMazeDisplayXDim = (props: MazeDisplayContainerProps) => {
  return props.maze.xDim * props.cellDim;
}

const getMazeDisplayYDim = (props: MazeDisplayContainerProps) => {
  return props.maze.yDim * props.cellDim;
}

const MazeDisplayContainer = styled.div`
  display: block;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  width: ${getMazeDisplayXDim}px;
  height: ${getMazeDisplayYDim}px;
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
  border: 5px solid black;
`;

interface MazeDisplayProps {
  readonly maze: Maze;
}

const MazeDisplay: React.FC<MazeDisplayProps> = ({ maze}) => {
  const [cellDim, setCellDim] = useState(0);
  const [player, setPlayer] = useState(posn(0, 0));
  const [playerSolved, setPlayerSolved] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult>({ found: [], path: [] });
  const [timeoutId, setTimeoutId] = useState<any>();

  const delay = 300;

  const resetSearch = () => {
    clearTimeout(timeoutId);
    setSearchResult({ found: [], path: [] });
  }

  useEffect(() => {
    clearTimeout(timeoutId);
    setSearchResult({ found: [], path: [] });
  }, [maze])

  useEffect(() => {
    if (player.x === maze.xDim - 1 && player.y === maze.yDim - 1) {
      setPlayerSolved(true);
    }
  }, [player, maze]);

  const onKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case ('ArrowRight'):
      case('D'):
        if (canMoveRight(player, maze)) {
          setPlayer((prev) => {
            return posn(prev.x + 1, prev.y);
          });
        }
        break;
      case ('ArrowLeft'):
      case('A'):
        if (canMoveLeft(player, maze)) {
          setPlayer((prev) => {
            return posn(prev.x - 1, prev.y);
          });
        }
        break;
      case ('ArrowUp'):
      case('W'):
        if (canMoveUp(player, maze)) {
          setPlayer((prev) => {
            return posn(prev.x, prev.y - 1);
          });
        }
        break;
      case ('ArrowDown'):
      case('S'):
        if (canMoveDown(player, maze)) {
          setPlayer((prev) => {
            return posn(prev.x, prev.y + 1);
          });
        }
        break;
      case ('b'):
        resetSearch();
        const bfsResult = bfsFinish(maze);
        setTimeoutId(setTimeout(() => setSearchResult({ found: bfsResult.found, path: [] }), 1));
        setTimeoutId(setTimeout(() => setSearchResult(bfsResult), delay * bfsResult.found.length));
        break;
      case ('f'):
        resetSearch();
        const dfsResult = dfsFinish(maze);
        setTimeoutId(setTimeout(() => setSearchResult({ found: dfsResult.found, path: [] }), 1));
        setTimeoutId(setTimeout(() => setSearchResult(dfsResult), delay * dfsResult.found.length));
        break;
      case ('r'):
        resetSearch();
        setPlayer(posn(0, 0));
        break;
    }
  }

  useEffect(() => {
    setPlayer(posn(0, 0));
  }, [maze])

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  })

  useEffect(() => {
    const calcCellDim = () => {
      const width = window.innerWidth - 50;
      const height = window.innerHeight - 250;
      setCellDim(Math.min(width / maze.xDim, height / maze.yDim));
    }

    calcCellDim();
    window.addEventListener('resize', calcCellDim);
    return () => window.removeEventListener('resize', calcCellDim);
  })

  return (
      <>
        {playerSolved && <p>Maze solved!</p>}
        <MazeDisplayContainer maze={maze} cellDim={cellDim}>
          {maze.nodes.map((node, id) => {
            return <NodeDisplay key={id} className={(searchResult.found.includes(id) ? 'found' : '') + (searchResult.path.includes(id) ? ' path' : '')} node={node} maze={maze} found={searchResult.found} path={searchResult.path} cellDim={cellDim} delay={delay} />
          })}
          <PlayerDisplay cellDim={cellDim} player={player} />
        </MazeDisplayContainer>
        <p>Press f to solve the maze with DFS, b to solve the maze with BFS, or r to reset the maze!</p>
      </>
  );
}

export default MazeDisplay;
