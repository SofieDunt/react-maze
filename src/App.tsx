import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InlineDisplay, InlineHeader } from './components/theme';
import MakeMazeForm from './components/makeMazeForm';
import { BACKGROUND, BANNER_COLOR, BORDER_COLOR, TEXT_COLOR } from './theme';
import MazeGame from './components/mazeGame';
import { GameDto, GetGameDto, IdMap, MapMapper } from './api/dto';
import ApiClient, { PromiseRejectReason } from './api/apiClient';

const AppContainer = styled.div`
  height: 100vh;
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
  width: 100%;
  box-sizing: border-box;
`;

const SettingsContainer = styled.div`
  padding: 5px 20px;
  font-size: 16px;
  line-height: 35px;
`;

const MazeContainer = styled.div`
  box-sizing: border-box;
  min-width: 100vw;
  padding: 0 30px 25px;
`;

enum Status {
  LOADING,
  LOADED,
  FAILED,
}

export const getTarget = (xDim: number, yDim: number): number => {
  return xDim * yDim - 1;
};

export interface MappedSearchResult {
  readonly found: IdMap;
  readonly path: IdMap;
}

const App: React.FC = () => {
  const [game, setGame] = useState<GameDto>();
  const [status, setStatus] = useState<Status>(Status.LOADING);

  useEffect(() => {
    ApiClient.getGame(new GetGameDto(5, 5, 0, 0, getTarget(5, 5)))
      .then((game) => {
        setStatus(Status.LOADED);
        setGame(game);
      })
      .catch((reason: PromiseRejectReason) => {
        setStatus(Status.FAILED);
        window.alert(reason.message);
      });
  }, []);

  return (
    <>
      {(() => {
        if (game) {
          const maze = game.maze;
          const bfsSearch: MappedSearchResult = {
            found: MapMapper.mapKeyVals(game.bfsSearch.found),
            path: MapMapper.mapKeyVals(game.bfsSearch.path),
          };
          const dfsSearch: MappedSearchResult = {
            found: MapMapper.mapKeyVals(game.dfsSearch.found),
            path: MapMapper.mapKeyVals(game.dfsSearch.path),
          };

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
              <PageTitle>Maze 2.0</PageTitle>
              <SettingsContainer>
                <div>
                  <InlineDisplay>
                    <InlineHeader>
                      {maze.yDim} x {maze.xDim} {displayBias()}
                    </InlineHeader>
                  </InlineDisplay>
                </div>
                <MakeMazeForm setGame={setGame} />
              </SettingsContainer>

              <MazeContainer>
                {
                  <MazeGame
                    maze={maze}
                    bfsSearch={bfsSearch}
                    dfsSearch={dfsSearch}
                  />
                }
              </MazeContainer>
            </AppContainer>
          );
        } else {
          return (
            <AppContainer>
              <PageTitle>Maze</PageTitle>
              <SettingsContainer>
                <InlineHeader>
                  {status === Status.LOADING
                    ? 'Loading...'
                    : 'Failed to start maze.'}
                </InlineHeader>
              </SettingsContainer>
            </AppContainer>
          );
        }
      })()}
    </>
  );
};

export default App;
