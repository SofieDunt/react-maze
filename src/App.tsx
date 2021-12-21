import React, { useState } from "react";
import constructMaze from "./logic/constructMaze";
import Maze from "./logic/maze";
import styled from "styled-components";
import {
  InlineDisplay,
  InlineHeader,
  InlineText,
} from "./components/utilComponents";
import MakeMazeForm from "./components/makeMazeForm";
import {
  BACKGROUND,
  BANNER_COLOR,
  BORDER_COLOR,
  PRIMARY_PLAYER_COLOR,
  STANDARD_COLOR,
  TEXT_COLOR,
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
  margin: 0;
  box-sizing: border-box;
  background: ${BACKGROUND};
  color: ${TEXT_COLOR};
  overflow: auto;
`;

const PageTitle = styled.h1`
  margin-bottom: 0;
  background: ${BANNER_COLOR};
  color: ${BORDER_COLOR};
  padding: 10px 20px;
  min-width: 100vw;
  box-sizing: border-box;
`;

const SettingsContainer = styled.div`
  padding: 5px 20px;
  font-size: 16px;
  line-height: 35px;
`;

const HeaderContainer = styled.div`
  box-sizing: border-box;
  min-height: 15vh;
`;

const MazeContainer = styled.div`
  box-sizing: border-box;
  min-width: 100vw;
  min-height: 85vh;
  padding: 0 30px 25px;
`;

const App = () => {
  const [xDim, setXDim] = useState(5);
  const [yDim, setYDim] = useState(5);
  const [bias, setBias] = useState(0);
  const [maze, setMaze] = useState<Maze>(constructMaze(xDim, yDim, bias));

  const setter: SetAppProps = { setXDim, setYDim, setBias, setMaze };

  const displayBias = () => {
    if (bias < 0) {
      return "Horizontal (" + Math.abs(bias) + ")";
    } else if (bias > 0) {
      return "Vertical (" + Math.abs(bias) + ")";
    } else {
      return "Standard";
    }
  };

  return (
    <AppContainer>
      <HeaderContainer>
        <PageTitle>Maze</PageTitle>
        <SettingsContainer>
          <div>
            <InlineDisplay>
              <InlineHeader>
                {yDim} x {xDim} {displayBias()}
              </InlineHeader>
            </InlineDisplay>
          </div>
          <MakeMazeForm setter={setter} />
        </SettingsContainer>
      </HeaderContainer>

      <MazeContainer>{maze && <GameDisplay maze={maze} />}</MazeContainer>
    </AppContainer>
  );
};

export default App;
