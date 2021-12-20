import React, {useState} from 'react';
import MazeDisplay from "./components/mazeDisplay/mazeDisplay";
import constructMaze from "./logic/mazeConstructor";
import Maze from "./logic/maze";
import styled from "styled-components";
import {InlineDisplay, InlineHeader, InlineText} from "./components/utilComponents";
import MakeMazeForm from "./components/makeMazeForm";

export interface SetAppProps {
  readonly setXDim: (xDim: number) => void;
  readonly setYDim: (yDim: number) => void;
  readonly setBias: (bias: number) => void;
  readonly setMaze: (maze: Maze) => void;
}

const PageTitle = styled.h1`
  margin-bottom: 0;
`;

const AppContainer = styled.div`
  text-align: center;
  padding: 0;
  border-box: 0;
`

const App = () => {
  const [xDim, setXDim] = useState(5);
  const [yDim, setYDim] = useState(5);
  const [bias, setBias] = useState(0);
  const [maze, setMaze] = useState<Maze>(constructMaze(xDim, yDim, bias));

  const setter: SetAppProps = { setXDim, setYDim, setBias, setMaze };

  const displayBias = () => {
    if (bias < 0) {
      return 'Horizontal (' + Math.abs(bias) + ')';
    } else if (bias > 0) {
      return 'Vertical (' + Math.abs(bias) + ')';
    } else {
      return 'Standard';
    }
  }

  return (
    <AppContainer>
      <PageTitle>Maze</PageTitle>
      <div>
        <InlineDisplay>
          <InlineHeader>Rows: </InlineHeader>
          <InlineText>{yDim}</InlineText>
        </InlineDisplay>
        <InlineDisplay>
          <InlineHeader>Columns:</InlineHeader>
          <InlineText>{xDim}</InlineText>
        </InlineDisplay>
        <InlineDisplay>
          <InlineHeader>Setting: </InlineHeader>
          <InlineText>{displayBias()}</InlineText>
        </InlineDisplay>
      </div>

      <MakeMazeForm setter={setter} />

      {maze && <MazeDisplay maze={maze} /> }
    </AppContainer>
  );
}

export default App;
