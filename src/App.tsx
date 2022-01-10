import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InlineDisplay, InlineHeader } from './components/theme';
import MakeMazeForm from './components/makeMazeForm';
import { BACKGROUND, BANNER_COLOR, BORDER_COLOR, TEXT_COLOR } from './theme';
import GameDisplay from './components/gameDisplay';
import { GetMazeDto, MazeDto } from './api/dto';
import ApiClient, { PromiseRejectReason } from './api/apiClient';

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

enum Status {
  LOADING,
  LOADED,
  FAILED,
}

const App: React.FC = () => {
  const [maze, setMaze] = useState<MazeDto>();
  const [status, setStatus] = useState<Status>(Status.LOADING);

  useEffect(() => {
    ApiClient.getMaze(new GetMazeDto(5, 5, 0))
      .then((maze) => {
        setStatus(Status.LOADED);
        setMaze(maze);
      })
      .catch((reason: PromiseRejectReason) => {
        setStatus(Status.FAILED);
        window.alert(reason.message);
      });
  }, []);

  return (
    <>
      {(() => {
        if (maze) {
          const displayBias = () => {
            if (maze.bias < 0) {
              return 'Horizontal (' + Math.abs(maze.bias) + ')';
            } else if (maze.bias > 0) {
              return 'Vertical (' + Math.abs(maze.bias) + ')';
            } else {
              return 'Standard';
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
                        {maze.yDim} x {maze.xDim} {displayBias()}
                      </InlineHeader>
                    </InlineDisplay>
                  </div>
                  <MakeMazeForm setMaze={setMaze} />
                </SettingsContainer>
              </HeaderContainer>

              <MazeContainer>{<GameDisplay maze={maze} />}</MazeContainer>
            </AppContainer>
          );
        } else {
          return (
            <AppContainer>
              <HeaderContainer>
                <PageTitle>Maze</PageTitle>
                <SettingsContainer>
                  <InlineHeader>
                    {status === Status.LOADING
                      ? 'Loading...'
                      : 'Failed to start maze.'}
                  </InlineHeader>
                </SettingsContainer>
              </HeaderContainer>
            </AppContainer>
          );
        }
      })()}
    </>
  );
};

export default App;
