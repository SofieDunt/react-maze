import React, {useState} from 'react';
import constructMaze from "./logic/constructMaze";
import Maze from "./logic/maze";
import styled from "styled-components";
import {InlineDisplay, InlineHeader, InlineText} from "./components/utilComponents";
import MakeMazeForm from "./components/makeMazeForm";
import {
  BACKGROUND,
  BORDER_COLOR,
  PRIMARY_PLAYER_COLOR,
  TERTIARY_PLAYER_COLOR
} from "./theme";
import GameDisplay from "./components/gameDisplay";

export interface SetAppProps {
  readonly setXDim: (xDim: number) => void;
  readonly setYDim: (yDim: number) => void;
  readonly setBias: (bias: number) => void;
  readonly setMaze: (maze: Maze) => void;
}

const AppContainer = styled.div`
  min-height: 100vh;
  font-family: Nunito Sans, sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background: ${BACKGROUND};
  color: ${BORDER_COLOR};
  overflow: auto;
`

const PageTitle = styled.h1`
  margin-bottom: 0;
  background: ${PRIMARY_PLAYER_COLOR};
  color: ${TERTIARY_PLAYER_COLOR};
  padding: 10px 20px;
  width: 100%;
`;

const SettingsContainer = styled.div`
  padding: 5px 20px;
  font-size: 16px;
  line-height: 30px;
`;

const HeaderContainer = styled.div`
  box-sizing: border-box;
  min-height: 20vh;
`;

const MazeContainer = styled.div`
  box-sizing: border-box;
  min-width: 100vw;
  min-height: 80vh;
  padding: 0 35px 25px;
`;

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
      <HeaderContainer>
        <PageTitle>Maze</PageTitle>
        <SettingsContainer>
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
        <p>Press f to solve the maze with DFS, b to solve the maze with BFS, or r to reset the maze!</p>
        </SettingsContainer>
        </HeaderContainer>

      <MazeContainer>
        {maze && <GameDisplay maze={maze} /> }
      </MazeContainer>
    </AppContainer>
  );
}

export default App;
