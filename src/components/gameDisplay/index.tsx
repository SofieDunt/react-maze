import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import PlayerDisplay from "../playerDisplay";
import { MOVE_KEYS, RESET_KEYS, SEARCH_KEYS } from "../../keys";
import SearchableMaze from "../searchableMaze";
import {
  GetMoveDto,
  GetPathDto,
  GetSearchDto,
  MappedSearchDto,
  MazeDto,
  PlayerDto,
  PosnDto,
  SearchDto,
} from "../../api/dto";
import ApiClient from "../../api/apiClient";

const mazeStart = new PlayerDto(new PosnDto(0, 0), 0);
const noneFound: MappedSearchDto = new MappedSearchDto(
  new SearchDto(
    new Map<number, number>(),
    new Map<number, number>(),
    new Map<number, number>()
  )
);
const delay = 10;

const SolvedBanner = styled.div`
  height: 45px;
  min-width: 100%;
  line-height: 45px;
  font-size: 19px;
`;

interface MazeDisplayProps {
  readonly maze: MazeDto;
}

const MazeGame: React.FC<MazeDisplayProps> = ({ maze }) => {
  const [cellDim, setCellDim] = useState(0);

  const [player, setPlayer] = useState<PlayerDto>(mazeStart);
  const [playerSolved, setPlayerSolved] = useState(false);
  const [playerFound, setPlayerFound] = useState(new Map<number, number>([]));
  const [playerParents, setPlayerParents] = useState(new Map<number, number>());

  const [timeoutId, setTimeoutId] = useState<any>();
  const [searchResult, setSearchResult] = useState<MappedSearchDto>(noneFound);

  const target = useMemo(() => maze.xDim * maze.yDim - 1, [maze]);

  const resetSearch = () => {
    setSearchResult(noneFound);
  };

  const resetPlayerStates = () => {
    setPlayer(mazeStart);
    setPlayerSolved(false);
    setPlayerFound(new Map<number, number>());
    setPlayerParents(new Map<number, number>());
  };

  const onPlayerFind = (found: PlayerDto): void => {
    if (!playerFound.has(found.nodeLocation)) {
      playerFound.set(found.nodeLocation, playerFound.size + 1);
      playerParents.set(found.nodeLocation, player.nodeLocation);
      setPlayer(found);
      onPlayerSolve(found);
    } else {
      setPlayer(found);
    }
  };

  const onPlayerSolve = (player: PlayerDto): void => {
    if (player.nodeLocation === target) {
      setPlayerSolved(true);
      resetSearch();
      setSearchResult((prev) => {
        return { found: playerFound, parents: playerParents, path: prev.path };
      });

      console.log(playerParents);
      ApiClient.getPath(
        new GetPathDto(playerParents, player.nodeLocation)
      ).then((path) => {
        setTimeoutId(
          setTimeout(
            () =>
              setSearchResult((prev) => {
                return { found: prev.found, parents: prev.parents, path };
              }),
            playerFound.size * delay,
            (err: any) => console.log(err.message)
          )
        );
      });
    }
  };

  function onKeyDown(e: KeyboardEvent): void {
    if (MOVE_KEYS[e.key] !== undefined) {
      ApiClient.getMove(
        new GetMoveDto(player.playerPosn, maze, MOVE_KEYS[e.key])
      ).then(
        (newPlayer) => {
          onPlayerFind(newPlayer);
        },
        (err: any) => console.log(err.message)
      );
    } else if (SEARCH_KEYS[e.key] !== undefined) {
      clearTimeout(timeoutId);
      ApiClient.getSearch(
        new GetSearchDto(
          maze,
          SEARCH_KEYS[e.key],
          mazeStart.nodeLocation,
          target
        )
      ).then((res) => {
        const mappedRes = new MappedSearchDto(res);
        setSearchResult({
          found: mappedRes.found,
          parents: mappedRes.parents,
          path: new Map<number, number>(),
        });
        setTimeoutId(
          setTimeout(
            () =>
              setSearchResult((prev) => {
                return {
                  found: prev.found,
                  parents: prev.parents,
                  path: mappedRes.path,
                };
              }),
            mappedRes.found.size * delay,
            (err: any) => console.log(err.message)
          )
        );
      });
    } else if (RESET_KEYS.has(e.key)) {
      clearTimeout(timeoutId);
      resetPlayerStates();
      resetSearch();
    }
  }

  useEffect(() => {
    resetSearch();
    resetPlayerStates();
  }, [maze]);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  useEffect(() => {
    const calcCellDim = () => {
      const width = window.innerWidth - 50;
      const height = window.innerHeight - 350;
      setCellDim(Math.max(Math.min(width / maze.xDim, height / maze.yDim), 15));
    };

    calcCellDim();
    window.addEventListener("resize", calcCellDim);
    return () => window.removeEventListener("resize", calcCellDim);
  });

  return (
    <>
      <SolvedBanner>
        <p>
          {playerSolved
            ? "Maze solved!"
            : "Find your way to the node at the bottom right!"}
        </p>
      </SolvedBanner>
      <SearchableMaze
        maze={maze}
        source={mazeStart.nodeLocation}
        target={target}
        searchResult={searchResult}
        player={player}
        playerFound={playerFound}
        cellDim={cellDim}
        delay={delay}
      >
        <PlayerDisplay cellDim={cellDim} player={player} maze={maze} />
      </SearchableMaze>
    </>
  );
};

export default MazeGame;
