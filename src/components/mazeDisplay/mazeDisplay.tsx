import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Maze from "../../logic/maze";
import NodeDisplay from "../nodeDisplay";
import PlayerDisplay from "../playerDisplay";
import {ScaledDisplayProps} from "../types";
import {canMoveDown, canMoveLeft, canMoveRight, canMoveUp} from "../../logic/utils";

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
  const [player, setPlayer] = useState({ x: 0, y: 0 });
  const [playerSolved, setPlayerSolved] = useState(false);

  useEffect(() => {
    if (player.x === maze.xDim - 1 && player.y === maze.yDim - 1) {
      setPlayerSolved(true);
    }
  }, [player, maze])

  const moveOnKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case ('ArrowRight'):
      case('D'):
        if (canMoveRight(player, maze)) {
          setPlayer((prev) => {
            return { x: prev.x + 1, y: prev.y } ;
          });
        }
        break;
      case ('ArrowLeft'):
      case('A'):
        if (canMoveLeft(player, maze)) {
          setPlayer((prev) => {
            return { x: prev.x - 1, y: prev.y };
          });
        }
        break;
      case ('ArrowUp'):
      case('W'):
        if (canMoveUp(player, maze)) {
          setPlayer((prev) => {
            return { x: prev.x, y: prev.y - 1 };
          });
        }
        break;
      case ('ArrowDown'):
      case('S'):
        if (canMoveDown(player, maze)) {
          setPlayer((prev) => {
            return { x: prev.x, y: prev.y + 1 };
          });
        }
        break;
    }
  }

  useEffect(() => {
    setPlayer({ x: 0, y: 0 });
  }, [maze])

  useEffect(() => {
    window.addEventListener('keydown', moveOnKeyDown);
    return () => window.removeEventListener('keydown', moveOnKeyDown);
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
            return <NodeDisplay key={id} node={node} maze={maze} cellDim={cellDim} />
          })}
          <PlayerDisplay cellDim={cellDim} player={player} />
        </MazeDisplayContainer>
      </>
  );
}

export default MazeDisplay;
