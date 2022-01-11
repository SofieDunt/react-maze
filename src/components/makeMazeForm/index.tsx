import React, { useState } from 'react';
import styled from 'styled-components';
import { InlineDisplay, InlineHeader } from '../theme';
import {
  BANNER_COLOR,
  BORDER_COLOR,
  SECONDARY_PLAYER_COLOR,
  STANDARD_COLOR,
  TERTIARY_PLAYER_COLOR,
  TEXT_COLOR,
} from '../../theme';
import { GameDto, GetGameDto } from '../../api/dto';
import ApiClient, { PromiseRejectReason } from '../../api/apiClient';
import { getTarget } from '../../App';

const Input = styled.input`
  width: 50px;
  height: 20px;
  margin-left: 5px;
  color: ${TEXT_COLOR};
  border-bottom: solid 2px ${BORDER_COLOR};
  font-family: Caveat, Nunito Sans, sans-serif;
  font-size: 25px;
  padding: 5px;
  text-align: center;
  font-weight: bold;
`;

const Button = styled.button`
  z-index: 9;
  border: 2px solid ${BORDER_COLOR};
  background: ${SECONDARY_PLAYER_COLOR};
  color: ${BANNER_COLOR};
  font-family: Nunito Sans, sans-serif;
  padding: 5px;
  font-size: 15px;
  &:hover {
    background: ${TERTIARY_PLAYER_COLOR};
    border: 2px solid ${STANDARD_COLOR};
  }
`;

interface FormProps {
  readonly setGame: (game: GameDto) => void;
}

const MakeMazeForm: React.FC<FormProps> = ({ setGame }) => {
  const [xDimInput, setXDimInput] = useState(5);
  const [yDimInput, setYDimInput] = useState(5);
  const [biasInput, setBiasInput] = useState(0);

  const onSubmit = () => {
    if (
      Number.isInteger(xDimInput) &&
      xDimInput > 0 &&
      Number.isInteger(yDimInput) &&
      yDimInput > 0 &&
      Number.isInteger(biasInput)
    ) {
      ApiClient.getGame(
        new GetGameDto(
          xDimInput,
          yDimInput,
          biasInput,
          0,
          getTarget(xDimInput, yDimInput),
        ),
      )
        .then((game) => {
          setGame(game);
        })
        .catch((reason: PromiseRejectReason) => {
          window.alert(reason.message);
        });
    } else {
      window.alert('Invalid Inputs' + xDimInput + yDimInput + biasInput);
    }
  };

  const validateNumber = (
    val: string,
    callback: (num: number) => void,
  ): void => {
    const num = Number(val);
    if (Number.isInteger(num)) {
      callback(num);
    }
  };

  return (
    <>
      <InlineDisplay>
        <InlineHeader>Rows:</InlineHeader>
        <Input
          type={'text'}
          onChange={(e) => validateNumber(e.currentTarget.value, setYDimInput)}
          value={yDimInput}
        />
      </InlineDisplay>
      <InlineDisplay>
        <InlineHeader>Columns:</InlineHeader>
        <Input
          type={'text'}
          onChange={(e) => validateNumber(e.currentTarget.value, setXDimInput)}
          value={xDimInput}
        />
      </InlineDisplay>
      <InlineDisplay>
        <InlineHeader>Bias:</InlineHeader>
        <Input
          type={'text'}
          onChange={(e) => validateNumber(e.currentTarget.value, setBiasInput)}
          value={biasInput}
        />
      </InlineDisplay>
      <Button onClick={onSubmit}>Make New Maze</Button>
    </>
  );
};

export default MakeMazeForm;
